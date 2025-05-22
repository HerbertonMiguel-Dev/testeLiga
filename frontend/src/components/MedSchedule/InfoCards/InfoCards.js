import React from 'react';

import { CardListContainer, StyledUL, StyledLI } from './InfoCards.styles';
import { H3 } from '../../Common/Text/Text';
import Card from '../../Common/Card/Card'; 

function InfoCards({ especialidades, convenios }) {
  return (
    <CardListContainer>
      
      <Card>
        <H3>Especialidades</H3>
        <StyledUL id="lista-especialidades">
          {especialidades.map(esp => (
            <StyledLI key={esp.id}>{esp.nome}</StyledLI>
          ))}
        </StyledUL>
      </Card>
      
      
      <Card>
        <H3>Convênios</H3>
        <StyledUL id="lista-convenios">
          {convenios.map(conv => (
            <StyledLI key={conv.id} value={conv.id}>{conv.nome}</StyledLI>
          ))}
        </StyledUL>
      </Card>
    </CardListContainer>
  );
}

export default InfoCards;