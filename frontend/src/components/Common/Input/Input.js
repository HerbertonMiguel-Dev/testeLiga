import React from 'react';
import { StyledInput, InputWrapper, StyledLabel } from './Input.styles';

function Input({ id, label, type = 'text', value, onChange, placeholder, required, ...props }) {
  return (
    <InputWrapper className="form-group"> {/* Mantém a classe para compatibilidade com CSS externo se houver */}
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledInput
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </InputWrapper>
  );
}

export default Input;