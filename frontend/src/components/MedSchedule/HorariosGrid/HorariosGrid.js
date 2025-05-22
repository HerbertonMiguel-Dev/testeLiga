import React from 'react';
import {
  GridContainer,
  GridHeader,
  GridDay,
  TimeSlotButton,
  NoAvailabilityMessage
} from './HorariosGrid.styles';
import { H4, Span } from '../../Common/Text/Text';

// Função auxiliar para formatar a data para exibição no cabeçalho
const formatDateHeader = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });
};

// Função auxiliar para formatar a hora para exibição nos botões
const formatTimeSlot = (timeString) => {
  const date = new Date(timeString); // timeString é a data e hora completa do slot
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

function HorariosGrid({ horariosDisponiveis, onSelectHorario, selectedHorarioId }) {
  // horariosDisponiveis é um objeto onde as chaves são as datas e os valores são arrays de horários
  // Ex: { '2025-05-22T00:00:00': [{id: 1, dataHora: '...'}, {id: 2, dataHora: '...'}], ... }

  const hasAvailability = Object.values(horariosDisponiveis).some(
    (daySlots) => daySlots.length > 0
  );

  return (
    <GridContainer>
      {hasAvailability ? (
        Object.keys(horariosDisponiveis).map((dateKey) => (
          <GridDay key={dateKey}>
            <GridHeader>
              <H4>{formatDateHeader(dateKey)}</H4>
            </GridHeader>
            {horariosDisponiveis[dateKey].length === 0 ? (
              <Span>Nenhum horário disponível para esta data.</Span>
            ) : (
              horariosDisponiveis[dateKey].map((slot) => (
                <TimeSlotButton
                  key={slot.id}
                  onClick={() => onSelectHorario(slot)}
                  isSelected={selectedHorarioId === slot.id}
                  disabled={slot.status === 'ocupado'} // Exemplo: se houver status para o slot
                >
                  {formatTimeSlot(slot.dataHora)}
                </TimeSlotButton>
              ))
            )}
          </GridDay>
        ))
      ) : (
        <NoAvailabilityMessage>
          Não há horários disponíveis para a combinação de médico, especialidade e data selecionados.
        </NoAvailabilityMessage>
      )}
    </GridContainer>
  );
}

export default HorariosGrid;