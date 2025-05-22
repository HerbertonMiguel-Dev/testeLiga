import styled from 'styled-components';

export const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  justify-content: center;
  margin-top: var(--spacing-lg);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledUL = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: var(--spacing-md);
`;

export const StyledLI = styled.li`
  background-color: var(--background-even-row);
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
  border-radius: var(--border-radius-sm);
  color: var(--text-color-dark);
  font-size: 0.95rem;
`;
