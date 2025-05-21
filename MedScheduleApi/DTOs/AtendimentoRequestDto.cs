using System.ComponentModel.DataAnnotations;

namespace MedScheduleApi.DTOs
{
    public class AtendimentoRequestDto
    {
        [Required(ErrorMessage = "O ID do agendamento é obrigatório.")]
        [Range(1, int.MaxValue, ErrorMessage = "O ID do agendamento deve ser um número positivo.")]
        public int AgendamentoId { get; set; }
        public string? Observacoes { get; set; }
    }
}