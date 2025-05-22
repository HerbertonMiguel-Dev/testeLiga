import styled from 'styled-components';

export const InputWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--dark-color);
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;