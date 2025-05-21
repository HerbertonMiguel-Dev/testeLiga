using MedScheduleApi.Data;
using MedScheduleApi.Models;
using MedScheduleApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedScheduleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EspecialidadesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EspecialidadesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Especialidades
        [HttpPost]
        public async Task<ActionResult<EspecialidadeDto>> PostEspecialidade([FromBody] EspecialidadeDto especialidadeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var especialidade = new Especialidade { Nome = especialidadeDto.Nome };
            _context.Especialidades.Add(especialidade);
            await _context.SaveChangesAsync();

            especialidadeDto.Id = especialidade.Id; // Retorna o ID gerado
            return CreatedAtAction(nameof(GetEspecialidades), new { id = especialidade.Id }, especialidadeDto);
        }

        // GET: api/Especialidades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EspecialidadeDto>>> GetEspecialidades()
        {
            var especialidades = await _context.Especialidades
                                            .Select(e => new EspecialidadeDto { Id = e.Id, Nome = e.Nome })
                                            .ToListAsync();
            return Ok(especialidades);
        }
    }
}