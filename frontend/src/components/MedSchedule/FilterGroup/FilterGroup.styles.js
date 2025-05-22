import styled from 'styled-components';

export const StyledFilters = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: flex-end; /* Alinha os botões com a base dos inputs */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;