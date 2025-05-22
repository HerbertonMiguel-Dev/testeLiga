import React from 'react';
import { StyledTable } from './AtendimentosList.styles';
import { Span } from '../../Common/Text/Text';

function AtendimentosList({ atendimentos }) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>ID Agendamento</th>
          <th>Paciente</th>
          <th>Médico</th>
          <th>Data Atendimento</th>
          <th>Observações</th>
        </tr>
      </thead>
      <tbody>
        {atendimentos.length === 0 ? (
          <tr><td colSpan="5">Nenhum atendimento encontrado.</td></tr>
        ) : (
          atendimentos.map(at => (
            <tr key={at.id}>
              <td data-label="ID Agendamento"><Span>{at.agendamentoId}</Span></td>
              <td data-label="Paciente"><Span>{at.agendamento?.paciente || 'N/A'}</Span></td>
              <td data-label="Médico"><Span>{at.agendamento?.medico || 'N/A'}</Span></td>
              <td data-label="Data Atendimento"><Span>{new Date(at.dataAtendimento).toLocaleString('pt-BR')}</Span></td>
              <td data-label="Observações"><Span>{at.observacoes}</Span></td>
            </tr>
          ))
        )}
      </tbody>
    </StyledTable>
  );
}

export default AtendimentosList;