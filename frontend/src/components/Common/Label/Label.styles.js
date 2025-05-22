import styled from 'styled-components';

export const StyledLabel = styled.label`
  display: block; /* Garante que o label ocupe sua própria linha */
  margin-bottom: 0.5rem; /* Espaçamento abaixo do label */
  font-weight: bold; /* Deixa o texto em negrito */
  color: var(--text-color-dark); /* Usa a cor de texto padrão definida em GlobalStyle */
  font-size: 0.95rem; /* Um pouco menor que o texto base, se preferir */
`;