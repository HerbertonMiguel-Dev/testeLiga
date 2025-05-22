import React from 'react';
import { StyledLabel } from './Label.styles';

function Label({ htmlFor, children, ...props }) {
  return (
    <StyledLabel htmlFor={htmlFor} {...props}>
      {children}
    </StyledLabel>
  );
}

export default Label;