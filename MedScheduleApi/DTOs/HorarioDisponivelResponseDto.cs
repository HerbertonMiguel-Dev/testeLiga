using System;

namespace MedScheduleApi.DTOs
{
    public class HorarioDisponivelResponseDto
    {
        public int MedicoId { get; set; }
        public string HoraInicio { get; set; } = string.Empty;
        public string HoraFim { get; set; } = string.Empty;
        public bool Disponivel { get; set; }
        public int? AgendamentoId { get; set; }
        public string? Paciente { get; set; }
        public string medico { get; set; } = string.Empty;
    }
}
