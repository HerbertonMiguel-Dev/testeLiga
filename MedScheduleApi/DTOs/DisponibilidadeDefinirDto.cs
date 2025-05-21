using System;
using System.ComponentModel.DataAnnotations;

namespace MedScheduleApi.DTOs
{
    public class DisponibilidadeDefinirDto
    {
        [Required(ErrorMessage = "O nome do médico é obrigatório.")]
        public string Medico { get; set; } = string.Empty;
        [Required(ErrorMessage = "O ID da especialidade é obrigatório.")]
        [Range(1, int.MaxValue, ErrorMessage = "O ID da especialidade deve ser um número positivo.")]
        public int EspecialidadeId { get; set; }
        [Required(ErrorMessage = "O dia da semana é obrigatório.")]
        public string DiaSemana { get; set; } = string.Empty; // Ex: "Segunda-feira"
        [Required(ErrorMessage = "A hora de início é obrigatória.")]
        [RegularExpression(@"^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$", ErrorMessage = "Formato de hora de início inválido (HH:mm).")]
        public string HoraInicio { get; set; } = string.Empty; // String para facilitar a entrada
        [Required(ErrorMessage = "A hora de fim é obrigatória.")]
        [RegularExpression(@"^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$", ErrorMessage = "Formato de hora de fim inválido (HH:mm).")]
        public string HoraFim { get; set; } = string.Empty; // String para facilitar a entrada
        [Required(ErrorMessage = "A duração da consulta é obrigatória.")]
        [Range(1, int.MaxValue, ErrorMessage = "A duração da consulta deve ser um número positivo em minutos.")]
        public int DuracaoConsultaMinutos { get; set; }
    }
}