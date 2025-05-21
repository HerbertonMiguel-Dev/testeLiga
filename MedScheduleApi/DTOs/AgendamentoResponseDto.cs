using System;

namespace MedScheduleApi.DTOs
{
    public class AgendamentoResponseDto
    {
        public int Id { get; set; }
        public string Paciente { get; set; } = string.Empty;
        public int EspecialidadeId { get; set; }
        public string EspecialidadeNome { get; set; } = string.Empty;
        public int ConvenioId { get; set; }
        public string ConvenioNome { get; set; } = string.Empty;
        public DateTime DataHora { get; set; }
        public string Medico { get; set; } = string.Empty;
        // ***** ADIÇÃO NECESSÁRIA PARA O REQUISITO DE "ATENDIDO" *****
        public bool HasAtendimento  { get; set; }
    }
}