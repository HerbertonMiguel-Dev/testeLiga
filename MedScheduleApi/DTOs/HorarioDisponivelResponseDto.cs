using System;

namespace MedScheduleApi.DTOs
{
    public class HorarioDisponivelResponseDto
    {
        public string HoraInicio { get; set; } = string.Empty;
        public string HoraFim { get; set; } = string.Empty;
        public bool Disponivel { get; set; } // Indica se o slot está livre
        public int? AgendamentoId { get; set; } // Opcional, se o slot estiver ocupado
        public string? Paciente { get; set; } // Opcional, se o slot estiver ocupado
        public string Medico { get; set; } = string.Empty; // ***** CRÍTICO: Médico do slot *****
        // Você pode adicionar DataCompletaSlot: DateTime para facilitar no frontend se preferir,
        // mas HoraInicio e HoraFim já devem ser suficientes para identificação visual.
    }
}