// DTOs/AtendimentoCreateDto.cs
namespace MedScheduleApi.DTOs
{
    public class AtendimentoCreateDto
    {
        public int AgendamentoId { get; set; }
        public string? Observacoes { get; set; }
    }
}