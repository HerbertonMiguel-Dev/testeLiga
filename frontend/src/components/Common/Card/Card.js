import React from 'react';
import { StyledCard } from './Card.styles';

function Card({ children, ...props }) {
  return (
    <StyledCard {...props}>
      {children}
    </StyledCard>
  );
}

export default Card;