import styled from 'styled-components';

export const FormStyled = styled.div` /* Não use <Form>, pois já é um componente em Styled-Components */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: var(--shadow);
`;

export const HorariosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--light-color);
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
`;

export const HorarioItem = styled.div`
  background-color: ${props => (props.$isAvailable ? 'white' : 'var(--danger-color)')};
  color: ${props => (props.$isAvailable ? 'var(--text-color)' : 'white')};
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid ${props => (props.$isAvailable ? 'var(--border-color)' : 'transparent')};
  cursor: ${props => (props.$isAvailable ? 'pointer' : 'not-allowed')};
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => (props.$isAvailable ? 'var(--primary-color)' : 'var(--danger-color)')};
    color: ${props => (props.$isAvailable ? 'white' : 'white')};
  }

  ${props =>
    props.$isSelected &&
    `
    border: 2px solid var(--info-color);
    box-shadow: 0 0 0 3px var(--info-color);
    background-color: var(--info-color);
    color: white;
  `}
`;