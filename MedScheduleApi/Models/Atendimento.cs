using System;

namespace MedScheduleApi.Models
{
    public class Atendimento
    {
        public int Id { get; set; }
        public int AgendamentoId { get; set; }
        public DateTime DataAtendimento { get; set; }
        public string Observacoes { get; set; } = string.Empty;

        // ** DESCOMENTE OU ADICIONE ESTA LINHA **
        public Agendamento? Agendamento { get; set; } // Propriedade de navegação para o Agendamento
    }
}