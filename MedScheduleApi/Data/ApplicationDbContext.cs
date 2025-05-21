// Data/ApplicationDbContext.cs

using Microsoft.EntityFrameworkCore;
using MedScheduleApi.Models;
using System;

namespace MedScheduleApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Especialidade> Especialidades { get; set; }
        public DbSet<Convenio> Convenios { get; set; }
        public DbSet<Disponibilidade> Disponibilidades { get; set; }
        public DbSet<Agendamento> Agendamentos { get; set; }
        public DbSet<Atendimento> Atendimentos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed inicial de dados (opcional, mas útil para testes)
            modelBuilder.Entity<Especialidade>().HasData(
                new Especialidade { Id = 1, Nome = "Cardiologia" },
                new Especialidade { Id = 2, Nome = "Dermatologia" },
                new Especialidade { Id = 3, Nome = "Pediatria" }
            );

            modelBuilder.Entity<Convenio>().HasData(
                new Convenio { Id = 1, Nome = "Unimed" },
                new Convenio { Id = 2, Nome = "SulAmérica" },
                new Convenio { Id = 3, Nome = "Amil" }
            );

            // ***** CONFIGURAÇÃO DA RELAÇÃO AGENDAMENTO <-> ATENDIMENTO *****
            // Um Agendamento pode ter um Atendimento (ou nenhum)
            modelBuilder.Entity<Agendamento>()
                .HasOne(a => a.Atendimento) // Agendamento tem um Atendimento (propriedade de navegação)
                .WithOne(at => at.Agendamento) // O Atendimento associado pertence a um Agendamento
                .HasForeignKey<Atendimento>(at => at.AgendamentoId) // A chave estrangeira está em Atendimento (AgendamentoId)
                .IsRequired(false); // Um Agendamento pode existir sem um Atendimento (ainda não atendido)

            // Configurações para Especialidade e Convênio (se você tiver modelos dedicados para eles)
            // Se EspecialidadeNome e ConvenioNome são armazenados diretamente no Agendamento,
            // e não há modelos de Especialidade/Convenio com coleções de Agendamentos,
            // então estas linhas abaixo não são estritamente necessárias para Agendamento.
            // Mas se você tem os modelos e quer a relação, adicione:
            /*
            modelBuilder.Entity<Agendamento>()
                .HasOne<Especialidade>()
                .WithMany()
                .HasForeignKey(a => a.EspecialidadeId);

            modelBuilder.Entity<Agendamento>()
                .HasOne<Convenio>()
                .WithMany()
                .HasForeignKey(a => a.ConvenioId);
            */
        }
    }
}