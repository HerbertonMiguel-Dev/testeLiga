import styled from 'styled-components';

export const Section = styled.section`
  background-color: var(--card-background);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;