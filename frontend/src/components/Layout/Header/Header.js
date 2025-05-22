import React from 'react';
import { StyledHeader } from './Header.styles';
import { H1 } from '../../Common/Text/Text';

function Header({ children }) {
  return (
    <StyledHeader>
      <H1>{children}</H1>
    </StyledHeader>
  );
}

export default Header;
