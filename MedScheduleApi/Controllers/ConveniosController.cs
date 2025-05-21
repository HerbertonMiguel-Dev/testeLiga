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
    public class ConveniosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ConveniosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Convenios
        [HttpPost]
        public async Task<ActionResult<ConvenioDto>> PostConvenio([FromBody] ConvenioDto convenioDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var convenio = new Convenio { Nome = convenioDto.Nome };
            _context.Convenios.Add(convenio);
            await _context.SaveChangesAsync();

            convenioDto.Id = convenio.Id; // Retorna o ID gerado
            return CreatedAtAction(nameof(GetConvenios), new { id = convenio.Id }, convenioDto);
        }

        // GET: api/Convenios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConvenioDto>>> GetConvenios()
        {
            var convenios = await _context.Convenios
                                        .Select(c => new ConvenioDto { Id = c.Id, Nome = c.Nome })
                                        .ToListAsync();
            return Ok(convenios);
        }
    }
}