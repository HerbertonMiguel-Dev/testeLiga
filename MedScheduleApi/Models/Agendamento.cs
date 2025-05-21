// MedScheduleApi.Models.Agendamento.cs

using System;
using System.ComponentModel.DataAnnotations.Schema; // Adicione esta linha se ainda não tiver

namespace MedScheduleApi.Models
{
    public class Agendamento
    {
        public int Id { get; set; }
        public string Paciente { get; set; } = string.Empty;
        public int EspecialidadeId { get; set; }
        public string EspecialidadeNome { get; set; } = string.Empty; // Se este campo é direto no Agendamento
        public int ConvenioId { get; set; }
        public string ConvenioNome { get; set; } = string.Empty; // Se este campo é direto no Agendamento
        public DateTime DataHora { get; set; }
        public string Medico { get; set; } = string.Empty;
        public int DuracaoConsultaMinutos { get; set; } // Propriedade para a duração da consulta
        public DateTime DataHoraFim { get; set; } // Propriedade para o fim do agendamento

        // ***** ADICIONE ESTA PROPRIEDADE DE NAVEGAÇÃO *****
        // Indica que um Agendamento pode ter um Atendimento (ou nenhum, por isso é nullable '?')
        public Atendimento? Atendimento { get; set; }

        // Propriedades de navegação opcionais (se você já tiver relacionamentos diretos no modelo)
        // public Especialidade Especialidade { get; set; } = null!;
        // public Convenio Convenio { get; set; } = null!;
    }
}