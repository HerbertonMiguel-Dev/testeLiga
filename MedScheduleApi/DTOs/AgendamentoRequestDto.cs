using System;
using System.ComponentModel.DataAnnotations;

namespace MedScheduleApi.DTOs
{
    public class AgendamentoRequestDto
    {
        [Required(ErrorMessage = "O nome do paciente é obrigatório.")]
        public string Paciente { get; set; } = string.Empty;
        [Required(ErrorMessage = "O ID da especialidade é obrigatório.")]
        public int EspecialidadeId { get; set; }
        [Required(ErrorMessage = "O ID do convênio é obrigatório.")]
        public int ConvenioId { get; set; }
        [Required(ErrorMessage = "A data e hora da consulta são obrigatórias.")]
        public DateTime DataHora { get; set; }

        // ***** CRÍTICO: Adicione esta linha *****
        [Required(ErrorMessage = "O nome do médico é obrigatório.")]
        public string Medico { get; set; } = string.Empty;
    }
}