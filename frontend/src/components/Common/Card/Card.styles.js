import styled from 'styled-components';

export const StyledCard = styled.div`
  background-color: var(--background-card); /* Fundo branco ou claro */
  padding: var(--spacing-lg); /* Espaçamento interno padrão */
  border-radius: var(--border-radius-md); /* Cantos arredondados */
  box-shadow: var(--shadow-medium); /* Sombra para profundidade */
  margin-bottom: var(--spacing-lg); /* Espaçamento externo inferior, pode ser ajustado com props */
  border: 1px solid var(--border-color); /* Borda sutil */

  /* Estilos para responsividade ou variações podem ser adicionados aqui ou como props */
  @media (max-width: 768px) {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }
`;