using System.ComponentModel.DataAnnotations;

namespace MedScheduleApi.DTOs
{
    public class ConvenioDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "O nome do convênio é obrigatório.")]
        public string Nome { get; set; } = string.Empty;
    }
}