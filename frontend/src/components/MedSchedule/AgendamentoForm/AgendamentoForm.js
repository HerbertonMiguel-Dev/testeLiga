import React, { useEffect } from 'react';
import { FormStyled, HorariosGrid, HorarioItem } from './AgendamentoForm.styles';
import Input from '../../Common/Input/Input';
import Select from '../../Common/Select/Select';
import Button from '../../Common/Button/Button';
import { Span } from '../../Common/Text/Text';

function AgendamentoForm({
  paciente, setPaciente,
  especialidadeAgendamento, setEspecialidadeAgendamento, especialidades, 
  convenioAgendamento, setConvenioAgendamento, convenios,
  dataAgendamento, setDataAgendamento, 
  medicoFiltro, setMedicoFiltro,       
  horarios, // Agora, esses horários terão a propriedade 'uniqueId'
  selectedSlot, setSelectedSlot,
  handleVerificarHorarios, handleAgendarConsulta
}) {
  const especialidadeOptions = [{ value: '', label: 'Selecione uma especialidade' }, ...especialidades.map(esp => ({ value: esp.id, label: esp.nome }))];
  const convenioOptions = [{ value: '', label: 'Selecione um convênio' }, ...convenios.map(conv => ({ value: conv.id, label: conv.nome }))];

  useEffect(() => {
    console.log("[AgendamentoForm] selectedSlot (prop) atualizado:", selectedSlot);
  }, [selectedSlot]);

  return (
    <FormStyled>
      <Input
        id="paciente"
        label="Nome do Paciente:"
        value={paciente}
        onChange={(e) => setPaciente(e.target.value)}
        required
      />

      <Select
        id="especialidade-agendamento"
        label="Especialidade:"
        value={especialidadeAgendamento}
        onChange={setEspecialidadeAgendamento} 
        options={especialidadeOptions}
        required
      />

      <Select
        id="convenio-agendamento"
        label="Convênio:"
        value={convenioAgendamento}
        onChange={(e) => setConvenioAgendamento(e.target.value)}
        options={convenioOptions}
        required
      />

      <Input
        id="data-agendamento"
        label="Data da Consulta:"
        type="date"
        value={dataAgendamento}
        onChange={setDataAgendamento} 
        required
      />

      <Input
        id="medico-filtro"
        label="Filtrar por Médico (opcional):"
        placeholder="Nome do Médico"
        value={medicoFiltro}
        onChange={setMedicoFiltro} 
      />

      <Button onClick={handleVerificarHorarios}>Verificar Horários Disponíveis</Button>

      <HorariosGrid>
        {horarios.length > 0 ? (
          horarios.map((h) => (
            <HorarioItem
              // AGORA USAMOS 'uniqueId' COMO CHAVE (key)
              key={h.uniqueId} 
              $isAvailable={h.disponivel}
              // AQUI A MUDANÇA PRINCIPAL: Comparar pelo 'uniqueId' para seleção
              $isSelected={selectedSlot && selectedSlot.uniqueId === h.uniqueId}
              onClick={() => {
                if (h.disponivel) {
                  setSelectedSlot(h); 
                  console.log("[AgendamentoForm] Horário clicado, definindo selectedSlot como:", h);
                } else {
                  setSelectedSlot(null); // Deseleciona se clicar em slot ocupado
                  alert("Este horário não está disponível.");
                }
              }}
              title={h.disponivel ? '' : `Ocupado por: ${h.paciente || 'Desconhecido'} (Agendamento #${h.agendamentoId || 'N/A'})`}
            >
              <Span>{h.horaInicio} - {h.horaFim}</Span>
              <Span>{h.disponivel ? (h.medico) : `Ocupado${h.paciente ? ` por ${h.paciente}` : ''}`}</Span>
            </HorarioItem>
          ))
        ) : (
          <p>Nenhum horário disponível para a data e especialidade selecionadas.</p>
        )}
      </HorariosGrid>

      <Button onClick={handleAgendarConsulta} disabled={!selectedSlot}>Agendar Consulta</Button>
    </FormStyled>
  );
}

export default AgendamentoForm;