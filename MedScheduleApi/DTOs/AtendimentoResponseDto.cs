using System;

namespace MedScheduleApi.DTOs
{
    public class AtendimentoResponseDto
    {
        public int Id { get; set; }
        public int AgendamentoId { get; set; }
        public DateTime DataAtendimento { get; set; }
        public string Observacoes { get; set; } = string.Empty;

        // ** ADICIONE ESTA PROPRIEDADE **
        public AgendamentoResponseDto? Agendamento { get; set; }
    }

    
}