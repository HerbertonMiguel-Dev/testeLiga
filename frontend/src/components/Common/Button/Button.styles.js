import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem; /* Ajuste conforme necessário */

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: var(--secondary-color);
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* Exemplo de botão de atendimento */
  &.atender-button {
    background-color: var(--success-color);
    &:hover {
      background-color: #218838;
    }
  }
`;