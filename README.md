# MedSchedule - Sistema de Agendamento Médico

Este é um sistema de agendamento médico que permite a gestão de especialidades, convênios, agendamentos e atendimentos. O projeto é dividido em duas partes principais: um **backend** (API RESTful em ASP.NET Core) e um **frontend** (aplicação web em React).

A execução do projeto é facilitada pelo Docker Compose, que orquestra ambos os serviços.

## Estrutura do Projeto

Certo! Como sou um modelo de linguagem e não tenho a capacidade de criar ou salvar arquivos diretamente no seu sistema de arquivos, o que posso fazer é fornecer o conteúdo do README.md novamente para que você possa copiá-lo e colá-lo em um arquivo.

Por favor, copie o texto abaixo e salve-o em um novo arquivo chamado README.md (certifique-se de que não há extensão .txt ou similar) na pasta raiz do seu projeto MedScheduleApi.

Markdown

# MedSchedule - Sistema de Agendamento Médico

Este é um sistema de agendamento médico que permite a gestão de especialidades, convênios, agendamentos e atendimentos. O projeto é dividido em duas partes principais: um **backend** (API RESTful em ASP.NET Core) e um **frontend** (aplicação web em React).

A execução do projeto é facilitada pelo Docker Compose, que orquestra ambos os serviços.

## Estrutura do Projeto

MedScheduleApi/
├── MedScheduleApi/       # Projeto do backend (ASP.NET Core)
│   ├── Data/
│   ├── Models/
│   ├── Controllers/
│   ├── Services/
│   ├── appsettings.json
│   ├── Program.cs
│   └── Dockerfile
├── frontend/             # Projeto do frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.js
│   │   └── styles/
│   │       ├── AppStyles.js
│   │       └── GlobalStyle.js
│   └── Dockerfile
└── docker-compose.yml    # Arquivo de orquestração Docker Compose
└── README.md             # Este arquivo

# Tecnologias Utilizadas

* **Backend:** ASP.NET Core
* **Banco de Dados:** In-Memory Database (para simplicidade e desenvolvimento, pode ser substituído por um DB persistente)
* **Frontend:** React.js
* **Estilização:** Styled-Components
* **Orquestração:** Docker e Docker Compose

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter o seguinte software instalado em sua máquina:

* **Docker Desktop:** Inclui Docker Engine, Docker CLI e Docker Compose.
    * [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Como Executar o Projeto

Siga os passos abaixo para levantar e executar a aplicação completa.

### 1. Navegar até a Pasta Raiz do Projeto

Abra o terminal ou prompt de comando e navegue até a pasta `MedScheduleApi` (onde se encontra o arquivo `docker-compose.yml`):

```bash
cd caminho/para/MedScheduleApi

2. Construir as Imagens Docker (Primeira Vez ou Após Alterações de Código)
É necessário construir as imagens Docker para o backend e o frontend. Este comando compila o código e empacota-o em contêineres:

Bash

docker-compose build

Observações:

Este comando só precisa ser executado na primeira vez que você for rodar o projeto, ou sempre que houver alterações significativas no código-fonte do backend ou frontend (como mudanças em Program.cs, package.json, Dockerfile, etc.).
Se você apenas alterar CSS ou JavaScript (e não arquivos que afetam a construção do Dockerfile, como dependências), pode ser que o docker-compose up seja suficiente. No entanto, para garantir, o docker-compose build é recomendado após quaisquer mudanças de código.

3. Iniciar os Contêineres
Após a construção das imagens, você pode iniciar os serviços:

Bash

docker-compose up

Observações:

Use docker-compose up -d para executar os contêineres em modo detached (em segundo plano), liberando o terminal.
Você verá os logs de inicialização de ambos os serviços no terminal. O backend (MedScheduleApi) deve exibir Application started. e Now listening on: http://[::]:5081.

4. Acessar a Aplicação
Uma vez que os contêineres estejam em execução:

Frontend (Aplicação Web):
Abra seu navegador e acesse:
http://localhost:3000

Backend (Swagger UI):
Para testar a API diretamente e ver a documentação, acesse o Swagger UI:
http://localhost:5081/swagger
(Certifique-se de que o ambiente do backend está configurado como Development no docker-compose.yml para que o Swagger seja habilitado).


Certo! Como sou um modelo de linguagem e não tenho a capacidade de criar ou salvar arquivos diretamente no seu sistema de arquivos, o que posso fazer é fornecer o conteúdo do README.md novamente para que você possa copiá-lo e colá-lo em um arquivo.

Por favor, copie o texto abaixo e salve-o em um novo arquivo chamado README.md (certifique-se de que não há extensão .txt ou similar) na pasta raiz do seu projeto MEDSCHEDULEAPI.

Markdown

# MedSchedule - Sistema de Agendamento Médico

Este é um sistema de agendamento médico que permite a gestão de especialidades, convênios, agendamentos e atendimentos. O projeto é dividido em duas partes principais: um **backend** (API RESTful em ASP.NET Core) e um **frontend** (aplicação web em React).

A execução do projeto é facilitada pelo Docker Compose, que orquestra ambos os serviços.

## Estrutura do Projeto

MEDSCHEDULEAPI/
├── MedScheduleApi/       # Projeto do backend (ASP.NET Core)
│   ├── Data/
│   ├── Models/
│   ├── Controllers/
│   ├── Services/
│   ├── appsettings.json
│   ├── Program.cs
│   └── Dockerfile
├── frontend/             # Projeto do frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.js
│   │   └── styles/
│   │       ├── AppStyles.js
│   │       └── GlobalStyle.js
│   └── Dockerfile
└── docker-compose.yml    # Arquivo de orquestração Docker Compose
└── README.md             # Este arquivo


## Tecnologias Utilizadas

* **Backend:** ASP.NET Core
* **Banco de Dados:** In-Memory Database (para simplicidade e desenvolvimento, pode ser substituído por um DB persistente)
* **Frontend:** React.js
* **Estilização:** Styled-Components
* **Orquestração:** Docker e Docker Compose

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter o seguinte software instalado em sua máquina:

* **Docker Desktop:** Inclui Docker Engine, Docker CLI e Docker Compose.
    * [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Como Executar o Projeto

Siga os passos abaixo para levantar e executar a aplicação completa.

### 1. Navegar até a Pasta Raiz do Projeto

Abra o terminal ou prompt de comando e navegue até a pasta `MEDSCHEDULEAPI` (onde se encontra o arquivo `docker-compose.yml`):

```bash
cd caminho/para/MEDSCHEDULEAPI
2. Construir as Imagens Docker (Primeira Vez ou Após Alterações de Código)
É necessário construir as imagens Docker para o backend e o frontend. Este comando compila o código e empacota-o em contêineres:

Bash

docker-compose build
Observações:

Este comando só precisa ser executado na primeira vez que você for rodar o projeto, ou sempre que houver alterações significativas no código-fonte do backend ou frontend (como mudanças em Program.cs, package.json, Dockerfile, etc.).
Se você apenas alterar CSS ou JavaScript (e não arquivos que afetam a construção do Dockerfile, como dependências), pode ser que o docker-compose up seja suficiente. No entanto, para garantir, o docker-compose build é recomendado após quaisquer mudanças de código.
3. Iniciar os Contêineres
Após a construção das imagens, você pode iniciar os serviços:

Bash

docker-compose up
Observações:

Use docker-compose up -d para executar os contêineres em modo detached (em segundo plano), liberando o terminal.
Você verá os logs de inicialização de ambos os serviços no terminal. O backend (MedScheduleApi) deve exibir Application started. e Now listening on: http://[::]:5081.
4. Acessar a Aplicação
Uma vez que os contêineres estejam em execução:

Frontend (Aplicação Web):
Abra seu navegador e acesse:
http://localhost:3000

Backend (Swagger UI):
Para testar a API diretamente e ver a documentação, acesse o Swagger UI:
http://localhost:5081/swagger
(Certifique-se de que o ambiente do backend está configurado como Development no docker-compose.yml para que o Swagger seja habilitado).

Observações Importantes
Banco de Dados In-Memory: O backend utiliza um banco de dados em memória (UseInMemoryDatabase). Isso significa que todos os dados são perdidos toda vez que os contêineres do backend são reiniciados (docker-compose down seguido de docker-compose up). Para persistência de dados, seria necessário configurar um banco de dados externo (como SQL Server, PostgreSQL, MySQL) e ajustar a Connection String no appsettings.json do backend e, possivelmente, no docker-compose.yml.
Variáveis de Ambiente: O ambiente do backend está configurado como Development no docker-compose.yml (ASPNETCORE_ENVIRONMENT=Development). Isso é essencial para que o Swagger UI seja habilitado e para que certas configurações de desenvolvimento sejam aplicadas.
Comunicação entre Contêineres (Frontend para Backend):
No arquivo frontend/src/api.js, a API_BASE_URL está definida como http://localhost:5081/api. Isso é porque o navegador (na sua máquina host) que acessa o frontend precisa se comunicar com o backend via localhost e a porta mapeada.
Se o frontend estivesse se comunicando internamente com o backend (sem passar pelo navegador, por exemplo, em um cenário de SSR ou testes internos do Docker), a URL seria http://backend:5081/api (onde backend é o nome do serviço no docker-compose.yml).
Responsividade: O frontend foi projetado para ser responsivo e adaptar-se a diferentes tamanhos de tela (celulares, tablets, notebooks, desktops) usando Styled-Components e Media Queries.
CORS: A política CORS está configurada no backend para permitir requisições da origem http://localhost:3000. Se você mudar a porta do frontend, precisará atualizar essa configuração no Program.cs do backend.

Parar e Remover os Contêineres
Para parar e remover todos os contêineres, redes e volumes criados pelo Docker Compose:

Bash

docker-compose down

Para parar apenas os contêineres sem removê-los (para reiniciá-los rapidamente mais tarde com docker-compose start):

Bash

docker-compose stop