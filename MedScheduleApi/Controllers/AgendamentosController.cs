using MedScheduleApi.Data;
using MedScheduleApi.Models;
using MedScheduleApi.DTOs;
using MedScheduleApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System; // Adicione para StringComparison.OrdinalIgnoreCase

namespace MedScheduleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendamentosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AgendamentoService _agendamentoService;

        public AgendamentosController(ApplicationDbContext context, AgendamentoService agendamentoService)
        {
            _context = context;
            _agendamentoService = agendamentoService;
        }

        // POST: api/Agendamentos
        [HttpPost]
        public async Task<ActionResult<AgendamentoResponseDto>> PostAgendamento([FromBody] AgendamentoRequestDto agendamentoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var agendamentoConfirmado = await _agendamentoService.AgendarConsultaAsync(agendamentoDto);

            if (agendamentoConfirmado == null)
            {
                return BadRequest(new { message = "Não foi possível agendar a consulta. O horário pode estar indisponível, em conflito, ou dados inválidos." });
            }

            // O AgendamentoService já retorna o DTO completo, incluindo Atendido.
            return CreatedAtAction(nameof(GetAgendamentos), new { id = agendamentoConfirmado.Id }, agendamentoConfirmado);
        }

        // GET: api/Agendamentos (Para listar todos os agendamentos)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AgendamentoResponseDto>>> GetAgendamentos(
            [FromQuery] DateTime? dataInicio,
            [FromQuery] DateTime? dataFim,
            [FromQuery] string? paciente)
        {
            var query = _context.Agendamentos
                // ***** ADIÇÃO: Incluir o Atendimento para popular 'Atendido' *****
                .Include(a => a.Atendimento)
                .AsQueryable();

            if (dataInicio.HasValue)
            {
                query = query.Where(a => a.DataHora.Date >= dataInicio.Value.Date);
            }
            if (dataFim.HasValue)
            {
                query = query.Where(a => a.DataHora.Date <= dataFim.Value.Date);
            }
            if (!string.IsNullOrEmpty(paciente))
            {
                query = query.Where(a => a.Paciente.Contains(paciente, StringComparison.OrdinalIgnoreCase));
            }

            var agendamentos = await query
                .Select(a => new AgendamentoResponseDto
                {
                    Id = a.Id,
                    Paciente = a.Paciente,
                    EspecialidadeId = a.EspecialidadeId,
                    EspecialidadeNome = a.EspecialidadeNome,
                    ConvenioId = a.ConvenioId,
                    ConvenioNome = a.ConvenioNome,
                    DataHora = a.DataHora,
                    Medico = a.Medico,
                    // ***** ADIÇÃO: Popula o campo Atendido *****
                    HasAtendimento = a.Atendimento != null
                })
                .ToListAsync();

            return Ok(agendamentos);
        }

        // ***** NOVO ENDPOINT: GET para Horários Disponíveis *****
        // Geralmente, isso estaria em um AgendamentoController ou um controller de Disponibilidade,
        // pois lida com a busca de slots, não com a criação/listagem de agendamentos reais.
        [HttpGet("HorariosDisponiveis")]
        public async Task<ActionResult<IEnumerable<HorarioDisponivelResponseDto>>> GetHorariosDisponiveis(
            [FromQuery] int especialidadeId,
            [FromQuery] DateTime data,
            [FromQuery] string? medico) // Parâmetro opcional para filtrar por médico
        {
            var requestDto = new DisponibilidadeListarRequestDto
            {
                EspecialidadeId = especialidadeId,
                Data = data,
                Medico = medico
            };

            var horarios = await _agendamentoService.ListarHorariosDisponiveisAsync(requestDto);

            if (!horarios.Any())
            {
                return NotFound(new { message = "Nenhum horário disponível encontrado para os critérios fornecidos." });
            }

            return Ok(horarios);
        }
    }
}