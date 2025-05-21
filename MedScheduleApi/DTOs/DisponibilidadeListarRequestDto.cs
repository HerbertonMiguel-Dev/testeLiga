using System;
using System.ComponentModel.DataAnnotations;

namespace MedScheduleApi.DTOs
{
    public class DisponibilidadeListarRequestDto
    {
        [Required(ErrorMessage = "O ID da especialidade é obrigatório.")]
        public int EspecialidadeId { get; set; }
        [Required(ErrorMessage = "A data é obrigatória.")]
        public DateTime Data { get; set; }
        public string? Medico { get; set; } // Opcional, para filtrar por médico
    }
}