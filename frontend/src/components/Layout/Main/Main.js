import styled from 'styled-components';

export const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0 15px;
    gap: 1.5rem;
  }
`;
