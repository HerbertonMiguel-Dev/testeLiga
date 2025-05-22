using MedScheduleApi.Data;
using MedScheduleApi.DTOs;
using MedScheduleApi.Models;
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

            var agendamentosDoDia = await _context.Agendamentos
                .Where(a => a.DataHora.Date == request.Data.Date &&
                            a.EspecialidadeId == request.EspecialidadeId)
                .ToListAsync();

            foreach (var disp in disponibilidades)
            {
                int medicoIdFake = disp.Medico.GetHashCode();
                string medicoNomeParaResponse = disp.Medico;

                var horaAtual = disp.HoraInicio;
                while (horaAtual < disp.HoraFim)
                {
                    var slotInicioDateTime = request.Data.Date.Add(horaAtual);
                    var slotFimDateTime = slotInicioDateTime.AddMinutes(disp.DuracaoConsultaMinutos);

                    var agendamentoExistente = agendamentosDoDia.FirstOrDefault(a =>
                        a.Medico.Equals(medicoNomeParaResponse, StringComparison.OrdinalIgnoreCase) &&
                        a.DataHora < slotFimDateTime &&
                        a.DataHoraFim > slotInicioDateTime
                    );

                    horariosDisponiveis.Add(new HorarioDisponivelResponseDto
                    {
                        MedicoId = medicoIdFake,
                        Medico = medicoNomeParaResponse,
                        HoraInicio = horaAtual.ToString(@"hh\:mm"),
                        HoraFim = horaAtual.Add(TimeSpan.FromMinutes(disp.DuracaoConsultaMinutos)).ToString(@"hh\:mm"),
                        Disponivel = agendamentoExistente == null,
                        AgendamentoId = agendamentoExistente?.Id,
                        Paciente = agendamentoExistente?.Paciente
                    });

                    horaAtual = horaAtual.Add(TimeSpan.FromMinutes(disp.DuracaoConsultaMinutos));
                }
            }

            return horariosDisponiveis.OrderBy(h => h.HoraInicio).ThenBy(h => h.MedicoId).ToList();
        }

        public async Task<AgendamentoResponseDto?> AgendarConsultaAsync(AgendamentoRequestDto request)
        {
            var especialidade = await _context.Especialidades.FindAsync(request.EspecialidadeId);
            if (especialidade == null)
            {
                return null;
            }

            var convenio = await _context.Convenios.FindAsync(request.ConvenioId);
            if (convenio == null)
            {
                return null;
            }

            var diaDaSemana = request.DataHora.ToString("dddd", new CultureInfo("pt-BR"));
            var horaSolicitada = request.DataHora.TimeOfDay;

            var disponibilidade = await _context.Disponibilidades.FirstOrDefaultAsync(d =>
                d.EspecialidadeId == request.EspecialidadeId &&
                d.DiaSemana.Equals(diaDaSemana, StringComparison.OrdinalIgnoreCase) &&
                d.HoraInicio <= horaSolicitada &&
                horaSolicitada.Add(TimeSpan.FromMinutes(d.DuracaoConsultaMinutos)) <= d.HoraFim &&
                d.Medico.Equals(request.Medico, StringComparison.OrdinalIgnoreCase)
            );

            if (disponibilidade == null)
            {
                return null;
            }

            var agendamentoFim = request.DataHora.AddMinutes(disponibilidade.DuracaoConsultaMinutos);

            var agendamentoConflitante = await _context.Agendamentos.FirstOrDefaultAsync(a =>
                a.Medico.Equals(disponibilidade.Medico, StringComparison.OrdinalIgnoreCase) &&
                a.DataHora < agendamentoFim &&
                a.DataHoraFim > request.DataHora
            );

            if (agendamentoConflitante != null)
            {
                return null;
            }

            var novoAgendamento = new Agendamento
            {
                Paciente = request.Paciente,
                EspecialidadeId = request.EspecialidadeId,
                EspecialidadeNome = especialidade.Nome,
                ConvenioId = request.ConvenioId,
                ConvenioNome = convenio.Nome,
                DataHora = request.DataHora,
                Medico = request.Medico,
                DuracaoConsultaMinutos = disponibilidade.DuracaoConsultaMinutos,
                DataHoraFim = agendamentoFim
            };

            _context.Agendamentos.Add(novoAgendamento);
            await _context.SaveChangesAsync();

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
                HasAtendimento = false
            };
        }
    }
}
