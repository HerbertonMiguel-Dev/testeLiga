import styled, { css } from 'styled-components';

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  justify-content: center;
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--background-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-light);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: var(--spacing-sm);
    gap: var(--spacing-sm);
  }
`;

export const GridDay = styled.div`
  flex: 1;
  min-width: 180px;
  max-width: 250px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-sm);
  text-align: center;
  background-color: var(--background-light);
  box-shadow: var(--shadow-xs);

  @media (max-width: 768px) {
    width: 95%;
    max-width: unset;
  }
`;


export const GridHeader = styled.div`
  background-color: var(--primary-color);
  color: var(--text-color-light);
  padding: var(--spacing-xs) var(--spacing-sm);
  margin: calc(var(--spacing-sm) * -1) calc(var(--spacing-sm) * -1) var(--spacing-sm) calc(var(--spacing-sm) * -1); 
  border-top-left-radius: var(--border-radius-sm);
  border-top-right-radius: var(--border-radius-sm);

  ${H4} {
    color: var(--text-color-light); 
    margin-bottom: 0;
  }
`;

export const TimeSlotButton = styled.button`
  background-color: var(--secondary-color); 
  color: var(--text-color-light);
  padding: var(--spacing-xs) var(--spacing-sm);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: 0.9rem;
  margin: var(--spacing-xs); 
  transition: background-color 0.2s ease, transform 0.1s ease;
  min-width: 80px; 

  &:hover {
    background-color: var(--secondary-hover-color);
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
    color: var(--text-color-dark);
  }

  ${props => props.isSelected && css`
    background-color: var(--success-color); 
    border: 2px solid var(--primary-color);
    font-weight: bold;
    transform: scale(1.05);

    &:hover {
      background-color: var(--success-color);
    }
  `}

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: var(--spacing-xxs) var(--spacing-xs);
    min-width: 70px;
  }
`;

export const NoAvailabilityMessage = styled.p`
  color: var(--danger-color);
  font-weight: bold;
  text-align: center;
  padding: var(--spacing-lg);
  width: 100%;
`;