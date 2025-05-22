import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--spacing-lg);
  display: block; 
  overflow-x: auto; 
  white-space: nowrap; 
  border-radius: var(--border-radius-md);
  overflow: hidden; 
  box-shadow: var(--shadow-medium); 
`;

export const StyledThead = styled.thead`
  background-color: var(--primary-color);
  color: var(--text-color-light);

  @media (max-width: 768px) {
    display: none; /* Esconde o cabeçalho original em telas pequenas */
  }
`;

export const StyledTbody = styled.tbody`
  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

export const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: var(--background-even-row);
  }

  &:hover {
    background-color: #e9ecef; /* Cor mais clara ao passar o mouse */
  }

  @media (max-width: 768px) {
    display: block;
    margin-bottom: var(--spacing-md);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-md);
    background-color: var(--background-card);
    box-shadow: var(--shadow-light);
    display: flex; 
    flex-wrap: wrap; 
  }
`;

export const StyledTh = styled.th`
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: left;
  border-bottom: 1px solid var(--border-color);
  white-space: normal; 
  &:last-child {
    border-right: none;
  }
`;

export const StyledTd = styled.td`
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: left;
  border-bottom: 1px solid var(--border-color);
  white-space: normal;

  @media (max-width: 768px) {
    display: block;
    text-align: right; 
    padding-left: 50%; 
    position: relative;
    border: none; 
    width: 100%;

    &::before {
      content: attr(data-label);
      position: absolute;
      left: var(--spacing-sm); 
      width: calc(50% - var(--spacing-md)); 
      padding-right: var(--spacing-sm);
      white-space: nowrap;
      text-align: left;
      font-weight: bold;
      color: var(--text-color-dark);
    }
  }
`;