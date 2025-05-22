import React from 'react';
import { StyledButton } from './Button.styles';

function Button({ children, onClick, type = 'button', disabled, ...props }) {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;