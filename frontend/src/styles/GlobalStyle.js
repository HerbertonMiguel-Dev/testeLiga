import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
    box-sizing: border-box; /* Essencial para responsividade. Garante que padding e border não adicionem largura ao elemento */
  }

  *, *::before, *::after {
    box-sizing: inherit; /* Garante que todos os elementos herdem o box-sizing */
  }

  h1, h2, h3 {
    color: #4CAF50;
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    margin-right: 10px;
    transition: background-color 0.2s ease;

    @media (max-width: 480px) { /* Ajuste global para botões em mobile */
      font-size: 14px;
      padding: 8px 12px;
    }
  }

  button:hover {
    background-color: #45a049;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  input[type="text"],
  input[type="date"],
  input[type="datetime-local"],
  select {
    width: calc(100% - 22px); /* Mantém o calc para um espaçamento mínimo se necessário, ou mude para 100% se o padding já for tratado */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    /* box-sizing: border-box; /* Removido daqui porque já está no * e herdado */

    @media (max-width: 480px) {
      width: 100%; /* Ocupa a largura total em mobile */
      padding: 8px;
      font-size: 14px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    display: block; /* Essencial para tabelas responsivas */
    overflow-x: auto; /* Permite rolagem horizontal em telas pequenas */
    white-space: nowrap; /* Impede que o texto dentro das células quebre */
  }

  table, th, td {
    border: 1px solid #ddd;
  }

  th, td {
    padding: 10px;
    text-align: left;
    white-space: normal; /* Permite que o texto quebre dentro da célula novamente */
  }

  th {
    background-color: #4CAF50;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  @media (max-width: 768px) { /* Ajustes para tabelas em telas pequenas */
    table thead {
      display: none; /* Esconde o cabeçalho da tabela em telas pequenas */
    }

    table, tbody, tr, td {
      display: block; /* Faz com que td e tr se comportem como blocos */
      width: 100%;
    }

    table tr {
      margin-bottom: 15px;
      border: 1px solid #ddd;
      display: flex;
      flex-wrap: wrap; /* Permite que as células quebrem */
      background-color: #fff; /* Fundo branco para cada "linha" */
    }

    table td {
      text-align: right;
      padding-left: 50%; /* Espaço para o label virtual */
      position: relative;
      border: none; /* Remove bordas internas das células */
    }

    table td::before {
      content: attr(data-label); /* Usa o atributo data-label como "cabeçalho" */
      position: absolute;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      text-align: left;
      font-weight: bold;
    }
    /* Ajuste para células que não possuem label */
    table td:first-child::before { content: "Paciente:"; }
    table td:nth-child(2)::before { content: "Especialidade:"; }
    table td:nth-child(3)::before { content: "Convênio:"; }
    table td:nth-child(4)::before { content: "Data/Hora:"; }
    table td:nth-child(5)::before { content: "Médico:"; }
    table td:nth-child(6)::before { content: "Atendido:"; }
    table td:nth-child(7)::before { content: "Ações:"; }
  }
`;

export default GlobalStyle;