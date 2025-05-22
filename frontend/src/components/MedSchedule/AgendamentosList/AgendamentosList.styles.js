import styled from 'styled-components';
import { StyledButton } from '../../Common/Button/Button.styles'; // Importa o estilo base do botão

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  box-shadow: var(--shadow);
  border-radius: 8px;
  overflow: hidden; /* Garante que os cantos arredondados sejam aplicados */

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  thead {
    background-color: var(--primary-color);
    color: white;
  }

  tbody tr:nth-child(even) {
    background-color: var(--light-color);
  }

  tbody tr:hover {
    background-color: #e9ecef;
  }

  /* Responsividade para tabelas */
  @media (max-width: 768px) {
    display: block;
    width: 100%;

    thead {
      display: none; /* Esconde o cabeçalho original em telas pequenas */
    }

    tbody {
      display: block;
      width: 100%;
    }

    tr {
      display: block;
      margin-bottom: 1rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1rem;
      background-color: var(--card-background);
      box-shadow: var(--shadow);
    }

    td {
      display: block;
      text-align: right;
      padding-left: 50%;
      position: relative;
      border: none; /* Remove a borda inferior individual da célula */

      &::before {
        content: attr(data-label);
        position: absolute;
        left: 15px;
        width: calc(50% - 30px);
        padding-right: 10px;
        white-space: nowrap;
        text-align: left;
        font-weight: bold;
        color: var(--dark-color);
      }
    }
  }
`;

export const AtenderButtonStyled = styled(StyledButton)`
  background-color: var(--success-color);
  padding: 8px 12px;
  font-size: 0.9rem;

  &:hover {
    background-color: #218838;
  }
`;