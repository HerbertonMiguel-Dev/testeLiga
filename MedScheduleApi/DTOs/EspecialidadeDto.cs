using System.ComponentModel.DataAnnotations;

namespace MedScheduleApi.DTOs
{
    public class EspecialidadeDto
    {
        public int Id { get; set; } // Opcional, para respostas
        [Required(ErrorMessage = "O nome da especialidade é obrigatório.")]
        public string Nome { get; set; } = string.Empty;
    }
}