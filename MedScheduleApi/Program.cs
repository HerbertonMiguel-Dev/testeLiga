using MedScheduleApi.Data;
using MedScheduleApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models; // Para Swagger
using System;

var builder = WebApplication.CreateBuilder(args);

// Adicionar serviços ao contêiner.

// Configuração do DbContext com In-Memory Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("MedScheduleDB")); // Nome do banco de dados em memória

builder.Services.AddControllers(); // Habilita controllers MVC

// Adicionar serviço AgendamentoService
builder.Services.AddScoped<AgendamentoService>();

// Adicionar suporte a CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", // Nome da sua política CORS
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Origem do seu front-end React
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Adicionar Swagger/OpenAPI (para testar a API facilmente)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "MedScheduleApi", Version = "v1" });
});

var app = builder.Build();

// Inicializar o banco de dados em memória com dados semente
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    context.Database.EnsureCreated(); // Garante que o banco de dados em memória seja criado
}

// Configurar o pipeline de requisições HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MedScheduleApi v1"));
}

app.UseHttpsRedirection();

app.UseRouting(); // Importante para o roteamento MVC

app.UseCors("AllowSpecificOrigin"); // Usar a política CORS definida

app.UseAuthorization();

app.MapControllers(); // Mapeia os controladores MVC

app.Run();