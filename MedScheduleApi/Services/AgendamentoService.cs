using MedScheduleApi.Data;
using MedScheduleApi.Models;
using MedScheduleApi.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Globalization;
using System.Threading.Tasks;

namespace MedScheduleApi.Services
{
    public class AgendamentoService
    {
        private readonly ApplicationDbContext _context;

        public AgendamentoService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<HorarioDisponivelResponseDto>> ListarHorariosDisponiveisAsync(DisponibilidadeListarRequestDto request)
        {
            var horariosDisponiveis = new List<HorarioDisponivelResponseDto>();

            var diaDaSemana = request.Data.ToString("dddd", new CultureInfo("pt-BR"));

            var disponibilidades = await _context.Disponibilidades
                .Where(d => d.EspecialidadeId == request.EspecialidadeId &&
                            d.DiaSemana.Equals(diaDaSemana, StringComparison.OrdinalIgnoreCase))
                .ToListAsync();

            if (!string.IsNullOrEmpty(request.Medico))
            {
                disponibilidades = disponibilidades.Where(d => d.Medico.Equals(request.Medico, StringComparison.OrdinalIgnoreCase)).ToList();
            }

            if (!disponibilidades.Any())
            {
                return horariosDisponiveis;
            }

            // Otimização: Carregue todos os agendamentos relevantes uma vez.
            // Isso evita múltiplas consultas ao DB dentro do loop.
            var agendamentosDoDia = await _context.Agendamentos
                .Where(a => a.DataHora.Date == request.Data.Date &&
                            a.EspecialidadeId == request.EspecialidadeId) // Filtra também por especialidade
                .ToListAsync();

            foreach (var disp in disponibilidades)
            {
                var horaAtual = disp.HoraInicio;
                while (horaAtual < disp.HoraFim)
                {
                    var slotInicioDateTime = request.Data.Date.Add(horaAtual);
                    var slotFimDateTime = slotInicioDateTime.AddMinutes(disp.DuracaoConsultaMinutos);

                    // ***** CRÍTICO: A verificação de agendamento existente agora usa a lista pré-carregada *****
                    // e compara pelo MÉDICO.
                    var agendamentoExistente = agendamentosDoDia.FirstOrDefault(a =>
                        a.Medico.Equals(disp.Medico, StringComparison.OrdinalIgnoreCase) && // Compare pelo médico
                        a.DataHora < slotFimDateTime &&
                        a.DataHoraFim > slotInicioDateTime
                    );

                    horariosDisponiveis.Add(new HorarioDisponivelResponseDto
                    {
                        HoraInicio = horaAtual.ToString(@"hh\:mm"),
                        HoraFim = horaAtual.Add(TimeSpan.FromMinutes(disp.DuracaoConsultaMinutos)).ToString(@"hh\:mm"),
                        Disponivel = agendamentoExistente == null,
                        AgendamentoId = agendamentoExistente?.Id,
                        Paciente = agendamentoExistente?.Paciente,
                        Medico = disp.Medico // ***** Passa o médico do slot *****
                    });

                    horaAtual = horaAtual.Add(TimeSpan.FromMinutes(disp.DuracaoConsultaMinutos));
                }
            }

            // Ordena primeiro pela HoraInicio, depois pelo Médico para agrupar horários iguais de diferentes médicos
            return horariosDisponiveis.OrderBy(h => h.HoraInicio).ThenBy(h => h.Medico).ToList();
        }

        public async Task<AgendamentoResponseDto?> AgendarConsultaAsync(AgendamentoRequestDto request)
        {
            // Validações de existência da especialidade e convênio
            var especialidade = await _context.Especialidades.FindAsync(request.EspecialidadeId);
            if (especialidade == null)
            {
                return null; // Erro: Especialidade não encontrada
            }

            var convenio = await _context.Convenios.FindAsync(request.ConvenioId);
            if (convenio == null)
            {
                return null; // Erro: Convênio não encontrado
            }

            var diaDaSemana = request.DataHora.ToString("dddd", new CultureInfo("pt-BR"));
            var horaSolicitada = request.DataHora.TimeOfDay;

            // Encontrar a disponibilidade que abrange o horário solicitado para o MÉDICO ESPECÍFICO
            var disponibilidade = await _context.Disponibilidades.FirstOrDefaultAsync(d =>
                d.EspecialidadeId == request.EspecialidadeId &&
                d.DiaSemana.Equals(diaDaSemana, StringComparison.OrdinalIgnoreCase) &&
                d.HoraInicio <= horaSolicitada &&
                // A hora de término do slot deve estar dentro ou no limite do fim da disponibilidade
                horaSolicitada.Add(TimeSpan.FromMinutes(d.DuracaoConsultaMinutos)) <= d.HoraFim &&
                d.Medico.Equals(request.Medico, StringComparison.OrdinalIgnoreCase) // Adiciona filtro por médico para agendamento
            );

            if (disponibilidade == null)
            {
                // Nenhum médico com essa especialidade e dia tem disponibilidade para o horário solicitado OU
                // o médico selecionado no front-end não tem essa disponibilidade.
                return null;
            }

            // Calcular o fim do agendamento com base na duração da consulta da disponibilidade
            var agendamentoFim = request.DataHora.AddMinutes(disponibilidade.DuracaoConsultaMinutos);

            // Verificar conflito de horários para o MÉDICO ESPECÍFICO
            var agendamentoConflitante = await _context.Agendamentos.FirstOrDefaultAsync(a =>
                a.Medico.Equals(disponibilidade.Medico, StringComparison.OrdinalIgnoreCase) &&
                // Verifica se há sobreposição de horários (Início do existente < Fim do novo E Fim do existente > Início do novo)
                a.DataHora < agendamentoFim &&
                a.DataHoraFim > request.DataHora
            );

            if (agendamentoConflitante != null)
            {
                return null; // Horário já ocupado para este médico
            }

            // Cria o novo agendamento
            var novoAgendamento = new Agendamento
            {
                Paciente = request.Paciente,
                EspecialidadeId = request.EspecialidadeId,
                EspecialidadeNome = especialidade.Nome,
                ConvenioId = request.ConvenioId,
                ConvenioNome = convenio.Nome,
                DataHora = request.DataHora,
                Medico = request.Medico, // ***** Atribui o médico diretamente do request DTO *****
                DuracaoConsultaMinutos = disponibilidade.DuracaoConsultaMinutos,
                DataHoraFim = agendamentoFim
            };

            _context.Agendamentos.Add(novoAgendamento);
            await _context.SaveChangesAsync();

            // Retorna o DTO de resposta, **incluindo o campo Atendido**
            return new AgendamentoResponseDto
            {
                Id = novoAgendamento.Id,
                Paciente = novoAgendamento.Paciente,
                EspecialidadeId = novoAgendamento.EspecialidadeId,
                EspecialidadeNome = novoAgendamento.EspecialidadeNome,
                ConvenioId = novoAgendamento.ConvenioId,
                ConvenioNome = novoAgendamento.ConvenioNome,
                DataHora = novoAgendamento.DataHora,
                Medico = novoAgendamento.Medico,
                HasAtendimento  = false // Agendamento recém-criado, ainda não atendido
            };
        }
    }
}