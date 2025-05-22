using Microsoft.EntityFrameworkCore;
using MedScheduleApi.Models;

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

            modelBuilder.Entity<Agendamento>()
                .HasOne(a => a.Atendimento)
                .WithOne(at => at.Agendamento)
                .HasForeignKey<Atendimento>(at => at.AgendamentoId)
                .IsRequired(false);
        }
    }
}
