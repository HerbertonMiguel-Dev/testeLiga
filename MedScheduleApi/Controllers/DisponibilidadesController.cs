using MedScheduleApi.Data;
using MedScheduleApi.Models;
using MedScheduleApi.DTOs;
using MedScheduleApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace MedScheduleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisponibilidadesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AgendamentoService _agendamentoService;

        public DisponibilidadesController(ApplicationDbContext context, AgendamentoService agendamentoService)
        {
            _context = context;
            _agendamentoService = agendamentoService;
        }

        [HttpPost("definir")]
        public async Task<ActionResult<Disponibilidade>> DefinirDisponibilidade([FromBody] DisponibilidadeDefinirDto disponibilidadeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!TimeSpan.TryParse(disponibilidadeDto.HoraInicio, out TimeSpan horaInicioTimeSpan))
            {
                ModelState.AddModelError("HoraInicio", "Formato de hora de início inválido.");
                return BadRequest(ModelState);
            }
            if (!TimeSpan.TryParse(disponibilidadeDto.HoraFim, out TimeSpan horaFimTimeSpan))
            {
                ModelState.AddModelError("HoraFim", "Formato de hora de fim inválido.");
                return BadRequest(ModelState);
            }

            if (horaInicioTimeSpan >= horaFimTimeSpan)
            {
                return BadRequest(new { message = "A hora de início deve ser anterior à hora de fim." });
            }

            var especialidadeExistente = await _context.Especialidades.FindAsync(disponibilidadeDto.EspecialidadeId);
            if (especialidadeExistente == null)
            {
                return NotFound(new { message = "Especialidade não encontrada." });
            }

            var disponibilidade = new Disponibilidade
            {
                Medico = disponibilidadeDto.Medico,
                EspecialidadeId = disponibilidadeDto.EspecialidadeId,
                DiaSemana = disponibilidadeDto.DiaSemana,
                HoraInicio = horaInicioTimeSpan,
                HoraFim = horaFimTimeSpan,
                DuracaoConsultaMinutos = disponibilidadeDto.DuracaoConsultaMinutos
            };

            _context.Disponibilidades.Add(disponibilidade);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(DefinirDisponibilidade), new { id = disponibilidade.Id }, disponibilidade);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<HorarioDisponivelResponseDto>>> ListarHorarios([FromBody] DisponibilidadeListarRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var horarios = await _agendamentoService.ListarHorariosDisponiveisAsync(request);

            if (!horarios.Any())
            {
                return NotFound(new { message = "Nenhum horário disponível ou definido encontrado para os critérios." });
            }

            return Ok(horarios);
        }
    }
}
