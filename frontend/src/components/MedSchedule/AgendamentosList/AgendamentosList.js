import React from 'react';
import { StyledTable, AtenderButtonStyled } from './AgendamentosList.styles';
import { Span } from '../../Common/Text/Text'; // Usando o componente Span

function AgendamentosList({ agendamentos, handleMarcarAtendimento }) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Especialidade</th>
          <th>Convênio</th>
          <th>Data/Hora</th>
          <th>Médico</th>
          <th>Atendido</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {agendamentos.length === 0 ? (
          <tr><td colSpan="7">Nenhum agendamento encontrado.</td></tr>
        ) : (
          agendamentos.map(ag => (
            <tr key={ag.id}>
              <td data-label="Paciente"><Span>{ag.paciente}</Span></td>
              <td data-label="Especialidade"><Span>{ag.especialidadeNome}</Span></td>
              <td data-label="Convênio"><Span>{ag.convenioNome}</Span></td>
              <td data-label="Data/Hora"><Span>{new Date(ag.dataHora).toLocaleString('pt-BR')}</Span></td>
              <td data-label="Médico"><Span>{ag.medico}</Span></td>
              <td data-label="Atendido"><Span>{ag.HasAtendimento ? 'Sim' : 'Não'}</Span></td>
              <td data-label="Ações">
                {!ag.HasAtendimento && (
                  <AtenderButtonStyled onClick={() => handleMarcarAtendimento(ag.id)}>Atender</AtenderButtonStyled>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </StyledTable>
  );
}

export default AgendamentosList;