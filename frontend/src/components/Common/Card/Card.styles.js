import styled from 'styled-components';

export const StyledCard = styled.div`
  background-color: var(--background-card);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-medium);
  margin-bottom: var(--spacing-lg);
  border: 1px solid var(--border-color);

  @media (max-width: 768px) {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }
`;
