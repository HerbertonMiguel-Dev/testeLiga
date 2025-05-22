import styled from 'styled-components';

export const StyledH1 = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: var(--spacing-md);
  }
  @media (max-width: 480px) {
    font-size: 1.7rem;
    text-align: center;
  }
`;

export const StyledH2 = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const StyledH3 = styled.h3`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const StyledP = styled.p`
  font-size: var(--font-size-base);
  color: var(--text-color-dark);
  line-height: var(--line-height-base);
  margin-bottom: var(--spacing-sm);

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const StyledSpan = styled.span`
  font-size: inherit;
  color: inherit;
`;
