
# 🩺 MedSchedule - Sistema de Agendamento Médico

MedSchedule é um sistema completo de **agendamento médico**, com funcionalidades para gerenciar especialidades, convênios, agendamentos e atendimentos. O projeto é dividido em duas partes:

- 🔙 **Backend**: API RESTful construída com **ASP.NET Core**
- 🌐 **Frontend**: Aplicação web desenvolvida em **React.js**

A orquestração é feita com **Docker Compose**, facilitando o deploy de ambos os serviços com um único comando.

---

## 🗂️ Estrutura do Projeto

```
MedSchedule/
├── MedScheduleApi/       # Backend (ASP.NET Core)
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Data/
│   ├── appsettings.json
│   ├── Program.cs
│   └── Dockerfile
├── frontend/             # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.js
│   │   └── styles/
│   └── Dockerfile
├── docker-compose.yml    # Arquivo de orquestração Docker
└── README.md             # Este arquivo
```

---

## 🛠️ Tecnologias Utilizadas

| Camada     | Tecnologias                          |
|------------|--------------------------------------|
| Backend    | ASP.NET Core, Entity Framework Core  |
| Banco      | In-Memory (para dev)                 |
| Frontend   | React.js, Styled-Components          |
| Orquestração | Docker, Docker Compose             |

---

## 🖼️ Imagens do Projeto

### 💻 Interface Web (Frontend)

![Tela Inicial](./assets/tela-inicial.png)

### 🧪 API com Swagger (Backend)

![Swagger UI](./assets/APIcomSwagger.png)

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado e em execução

### 2. Clone o repositório

```bash
git clone https://github.com/seu-usuario/MedSchedule.git
cd MedSchedule
```

### 3. Construir as imagens

```bash
docker-compose build
```

### 4. Iniciar os serviços

```bash
docker-compose up
```

A aplicação estará disponível em:

- 🖥️ Frontend: [http://localhost:3000](http://localhost:3000)
- 📚 Swagger API: [http://localhost:5081/swagger](http://localhost:5081/swagger)

---

## ⚙️ Observações

- **Banco de Dados In-Memory**: Todos os dados são temporários. Reiniciar o backend apaga os dados.
- **Variáveis de Ambiente**: O ambiente do backend está como `Development` para permitir o Swagger.
- **CORS**: Configurado para `http://localhost:3000`. Ajuste conforme necessário no `Program.cs`.

---

## 📦 Comandos Úteis

| Ação                              | Comando                         |
|-----------------------------------|---------------------------------|
| Parar os contêineres              | `docker-compose stop`           |
| Parar e remover contêineres/redes | `docker-compose down`           |
| Executar em modo background       | `docker-compose up -d`          |

---

## 📱 Responsividade

A interface foi construída com **Styled-Components** e **media queries**, adaptando-se a diferentes tamanhos de tela: desktop, tablet e celular.

---

## 📬 Contato

Caso tenha dúvidas ou sugestões, entre em contato:
- 📧 Email: herbertonmiguel@gmail.com
- 💼 LinkedIn: [Herberton Miguel](https://www.linkedin.com/in/herbertonmiguel/)

---

> Projeto desenvolvido para fins educativos e demonstração de habilidades Full Stack com .NET + React + Docker.
