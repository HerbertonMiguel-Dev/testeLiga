// Controllers/AtendimentosController.cs

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Necessário para o .Include()
using MedScheduleApi.Data;
using MedScheduleApi.DTOs; // Seus DTOs (AtendimentoCreateDto, AtendimentoResponseDto, AgendamentoResponseDto)
using MedScheduleApi.Models; // Seus Models (Atendimento, Agendamento)
using System.Collections.Generic; // Necessário para IEnumerable
using System.Linq; // Necessário para .AsQueryable(), .ToListAsync(), .Select()
using System.Threading.Tasks; // Necessário para Task
using System; // Necessário para DateTime

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

        // ----------------------------------------------------
        // MÉTODO HTTP POST PARA CRIAR ATENDIMENTOS
        // ----------------------------------------------------
        [HttpPost]
        public async Task<ActionResult<AtendimentoResponseDto>> PostAtendimento([FromBody] AtendimentoCreateDto atendimentoDto)
        {
            // Validação básica do DTO de entrada
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Retorna erros de validação do modelo como JSON
            }

            // 1. Busque o agendamento E INCLUA SEU ATENDIMENTO EXISTENTE
            // O .Include(a => a.Atendimento) é fundamental para que o EF Core carregue
            // a propriedade de navegação "Atendimento" do Agendamento, permitindo verificar
            // se um atendimento já existe para este agendamento no banco de dados.
            var agendamento = await _context.Agendamentos
                                            .Include(a => a.Atendimento) // <<<<<<< ADICIONADO/CORRIGIDO: ESSENCIAL
                                            .FirstOrDefaultAsync(a => a.Id == atendimentoDto.AgendamentoId);

            // Verifica se o agendamento foi encontrado
            if (agendamento == null)
            {
                // Retorna um BadRequest com mensagem em formato JSON
                return BadRequest(new { message = $"Agendamento com ID {atendimentoDto.AgendamentoId} não encontrado." });
            }

            // 2. Verifique se o agendamento JÁ possui um atendimento
            // Agora usamos a propriedade de navegação 'agendamento.Atendimento' que foi carregada
            if (agendamento.Atendimento != null)
            {
                // Retorna um Conflict (409) com mensagem em formato JSON
                return Conflict(new { message = $"O agendamento com ID {atendimentoDto.AgendamentoId} já possui um atendimento registrado." });
            }

            // 3. Crie o novo objeto Atendimento
            var atendimento = new Atendimento
            {
                AgendamentoId = atendimentoDto.AgendamentoId,
                DataAtendimento = DateTime.Now, // Define a data/hora atual do atendimento
                Observacoes = atendimentoDto.Observacoes ?? string.Empty // Garante que a observação não é nula
            };

            // Adiciona o novo atendimento ao contexto do EF Core
            _context.Atendimentos.Add(atendimento);

            // Salva as mudanças no banco de dados.
            // O EF Core irá inserir o novo Atendimento e, graças à configuração em DbContext,
            // a relação com o Agendamento será estabelecida.
            await _context.SaveChangesAsync();

            // Mapeamento para o DTO de resposta, incluindo os dados do agendamento
            // para que o frontend possa exibir informações completas do agendamento atendido.
            var responseDto = new AtendimentoResponseDto
            {
                Id = atendimento.Id,
                AgendamentoId = atendimento.AgendamentoId,
                DataAtendimento = atendimento.DataAtendimento,
                Observacoes = atendimento.Observacoes,
                Agendamento = new AgendamentoResponseDto // Popula o Agendamento no response
                {
                    Id = agendamento.Id,
                    Paciente = agendamento.Paciente,
                    Medico = agendamento.Medico,
                    EspecialidadeNome = agendamento.EspecialidadeNome,
                    ConvenioNome = agendamento.ConvenioNome,
                    DataHora = agendamento.DataHora,
                    HasAtendimento = true // Indica que este agendamento AGORA tem um atendimento
                }
            };

            // Retorna um status 201 Created, apontando para o recurso recém-criado
            // Se você tiver um método GetAtendimento(int id) singular, use-o para o nameof
            // Ex: return CreatedAtAction(nameof(GetAtendimento), new { id = atendimento.Id }, responseDto);
            // Caso contrário, use GetAtendimentos e passe o ID para o cabeçalho Location.
            return CreatedAtAction(nameof(GetAtendimentos), new { id = atendimento.Id }, responseDto);
        }

        // ----------------------------------------------------
        // SEU MÉTODO HTTP GET PARA LISTAR ATENDIMENTOS
        // ----------------------------------------------------
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AtendimentoResponseDto>>> GetAtendimentos(
            [FromQuery] DateTime? dataInicio,
            [FromQuery] DateTime? dataFim,
            [FromQuery] string? paciente)
        {
            var query = _context.Atendimentos
                                .Include(a => a.Agendamento) // <<<<<<< ESSENCIAL para carregar dados do agendamento associado
                                .AsQueryable();

            if (dataInicio.HasValue)
            {
                query = query.Where(a => a.DataAtendimento.Date >= dataInicio.Value.Date);
            }

            if (dataFim.HasValue)
            {
                // Adiciona um dia para incluir o dia inteiro de dataFim na busca
                query = query.Where(a => a.DataAtendimento.Date <= dataFim.Value.Date);
            }

            if (!string.IsNullOrEmpty(paciente))
            {
                // Filtra pelo paciente do agendamento associado
                query = query.Where(a => a.Agendamento != null && a.Agendamento.Paciente.Contains(paciente, StringComparison.OrdinalIgnoreCase));
            }

            var atendimentos = await query.ToListAsync();

            // Mapeia os modelos para DTOs de resposta
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
                    // HasAtendimento é sempre true aqui, pois já estamos listando atendimentos.
                    // Se você quiser que o DTO de agendamento dentro do DTO de atendimento reflita o status,
                    // isso é conceitualmente redundante aqui, mas mantém a consistência do DTO AgendamentoResponseDto.
                    HasAtendimento = a.Agendamento.Atendimento != null
                } : null
            }).ToList();

            return Ok(atendimentoDtos);
        }

        // Se você tiver um método GET singular para Atendimento por ID, ele ficaria assim:
        /*
        [HttpGet("{id}")]
        public async Task<ActionResult<AtendimentoResponseDto>> GetAtendimento(int id)
        {
            var atendimento = await _context.Atendimentos
                                            .Include(a => a.Agendamento)
                                            .FirstOrDefaultAsync(a => a.Id == id);

            if (atendimento == null)
            {
                return NotFound(new { message = $"Atendimento com ID {id} não encontrado." });
            }

            var responseDto = new AtendimentoResponseDto
            {
                Id = atendimento.Id,
                AgendamentoId = atendimento.AgendamentoId,
                DataAtendimento = atendimento.DataAtendimento,
                Observacoes = atendimento.Observacoes,
                Agendamento = atendimento.Agendamento != null ? new AgendamentoResponseDto
                {
                    Id = atendimento.Agendamento.Id,
                    Paciente = atendimento.Agendamento.Paciente,
                    Medico = atendimento.Agendamento.Medico,
                    EspecialidadeNome = atendimento.Agendamento.EspecialidadeNome,
                    ConvenioNome = atendimento.Agendamento.ConvenioNome,
                    DataHora = atendimento.Agendamento.DataHora,
                    HasAtendimento = atendimento.Agendamento.Atendimento != null
                } : null
            };

            return Ok(responseDto);
        }
        */
    }
}