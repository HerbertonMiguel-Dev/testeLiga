using System;

namespace MedScheduleApi.Models
{
    public class Disponibilidade
    {
        public int Id { get; set; }
        public string Medico { get; set; } = string.Empty;
        public int EspecialidadeId { get; set; }
        public string DiaSemana { get; set; } = string.Empty; // Ex: "Segunda-feira"
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFim { get; set; }
        public int DuracaoConsultaMinutos { get; set; }
    }
}