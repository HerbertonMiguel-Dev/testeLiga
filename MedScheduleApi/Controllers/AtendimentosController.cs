using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedScheduleApi.Data;
using MedScheduleApi.DTOs;
using MedScheduleApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedScheduleApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtendimentosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AtendimentosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<AtendimentoResponseDto>> PostAtendimento([FromBody] AtendimentoCreateDto atendimentoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var agendamento = await _context.Agendamentos
                                            .Include(a => a.Atendimento)
                                            .FirstOrDefaultAsync(a => a.Id == atendimentoDto.AgendamentoId);

            if (agendamento == null)
            {
                return BadRequest(new { message = $"Agendamento com ID {atendimentoDto.AgendamentoId} não encontrado." });
            }

            if (agendamento.Atendimento != null)
            {
                return Conflict(new { message = $"O agendamento com ID {atendimentoDto.AgendamentoId} já possui um atendimento registrado." });
            }

            var atendimento = new Atendimento
            {
                AgendamentoId = atendimentoDto.AgendamentoId,
                DataAtendimento = DateTime.Now,
                Observacoes = atendimentoDto.Observacoes ?? string.Empty
            };

            _context.Atendimentos.Add(atendimento);
            await _context.SaveChangesAsync();

            var responseDto = new AtendimentoResponseDto
            {
                Id = atendimento.Id,
                AgendamentoId = atendimento.AgendamentoId,
                DataAtendimento = atendimento.DataAtendimento,
                Observacoes = atendimento.Observacoes,
                Agendamento = new AgendamentoResponseDto
                {
                    Id = agendamento.Id,
                    Paciente = agendamento.Paciente,
                    Medico = agendamento.Medico,
                    EspecialidadeNome = agendamento.EspecialidadeNome,
                    ConvenioNome = agendamento.ConvenioNome,
                    DataHora = agendamento.DataHora,
                    HasAtendimento = true
                }
            };

            return CreatedAtAction(nameof(GetAtendimentos), new { id = atendimento.Id }, responseDto);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AtendimentoResponseDto>>> GetAtendimentos(
            [FromQuery] DateTime? dataInicio,
            [FromQuery] DateTime? dataFim,
            [FromQuery] string? paciente)
        {
            var query = _context.Atendimentos
                                .Include(a => a.Agendamento)
                                .AsQueryable();

            if (dataInicio.HasValue)
            {
                query = query.Where(a => a.DataAtendimento.Date >= dataInicio.Value.Date);
            }

            if (dataFim.HasValue)
            {
                query = query.Where(a => a.DataAtendimento.Date <= dataFim.Value.Date);
            }

            if (!string.IsNullOrEmpty(paciente))
            {
                query = query.Where(a => a.Agendamento != null && a.Agendamento.Paciente.Contains(paciente, StringComparison.OrdinalIgnoreCase));
            }

            var atendimentos = await query.ToListAsync();

            var atendimentoDtos = atendimentos.Select(a => new AtendimentoResponseDto
            {
                Id = a.Id,
                AgendamentoId = a.AgendamentoId,
                DataAtendimento = a.DataAtendimento,
                Observacoes = a.Observacoes,
                Agendamento = a.Agendamento != null ? new AgendamentoResponseDto
                {
                    Id = a.Agendamento.Id,
                    Paciente = a.Agendamento.Paciente,
                    Medico = a.Agendamento.Medico,
                    EspecialidadeNome = a.Agendamento.EspecialidadeNome,
                    ConvenioNome = a.Agendamento.ConvenioNome,
                    DataHora = a.Agendamento.DataHora,
                    HasAtendimento = a.Agendamento.Atendimento != null
                } : null
            }).ToList();

            return Ok(atendimentoDtos);
        }
    }
}
