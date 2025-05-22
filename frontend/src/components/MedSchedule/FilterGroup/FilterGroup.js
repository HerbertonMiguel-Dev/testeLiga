import React from 'react';
import { StyledFilters } from './FilterGroup.styles';
import Input from '../../Common/Input/Input';
import Button from '../../Common/Button/Button';

function FilterGroup({
  dataInicio, setDataInicio,
  dataFim, setDataFim,
  paciente, setPaciente,
  onFilter
}) {
  return (
    <StyledFilters>
      <Input
        id="filtro-data-inicio"
        label="Data Início:"
        type="date"
        value={dataInicio}
        onChange={(e) => setDataInicio(e.target.value)}
      />
      <Input
        id="filtro-data-fim"
        label="Data Fim:"
        type="date"
        value={dataFim}
        onChange={(e) => setDataFim(e.target.value)}
      />
      <Input
        id="filtro-paciente"
        label="Paciente:"
        type="text"
        value={paciente}
        onChange={(e) => setPaciente(e.target.value)}
        placeholder="Nome do Paciente"
      />
      <Button onClick={onFilter}>Filtrar</Button>
    </StyledFilters>
  );
}

export default FilterGroup;