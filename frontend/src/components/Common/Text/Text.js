import React from 'react';
import { StyledH1, StyledH2, StyledH3, StyledP, StyledSpan } from './Text.styles';

export const H1 = ({ children, ...props }) => (
  <StyledH1 {...props}>{children}</StyledH1>
);

export const H2 = ({ children, ...props }) => (
  <StyledH2 {...props}>{children}</StyledH2>
);

export const H3 = ({ children, ...props }) => (
  <StyledH3 {...props}>{children}</StyledH3>
);

export const P = ({ children, ...props }) => (
  <StyledP {...props}>{children}</StyledP>
);

export const Span = ({ children, ...props }) => (
  <StyledSpan {...props}>{children}</StyledSpan>
);
