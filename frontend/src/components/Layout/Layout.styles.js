import styled from 'styled-components';

export const MainContent = styled.main`
  padding: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
    min-height: calc(100vh - 100px);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-md);
    min-height: calc(100vh - 80px);
  }
`;
