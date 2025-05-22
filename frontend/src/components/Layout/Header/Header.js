import React from 'react';
import { StyledHeader } from './Header.styles';
import { H1 } from '../../Common/Text/Text'; // Usando o componente H1

function Header({ children }) {
  return (
    <StyledHeader>
      <H1>{children}</H1> {/* Renderiza o título via children */}
    </StyledHeader>
  );
}

export default Header;