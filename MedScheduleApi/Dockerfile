# Usa a imagem base do .NET SDK para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo de projeto .csproj para o diretório de trabalho
# e restaura as dependências. Isso aproveita o cache do Docker.
COPY *.csproj ./
RUN dotnet restore

# Copia o restante dos arquivos do projeto
COPY . .

# Publica a aplicação em modo Release
RUN dotnet publish -c Release -o out

# Usa a imagem base do .NET ASP.NET Runtime para execução
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/out .

# Expõe a porta que o backend estará ouvindo (5081 conforme seu erro anterior)
EXPOSE 5081

# Comando para executar a aplicação
ENTRYPOINT ["dotnet", "MedScheduleApi.dll"]