import React from 'react';
import { StyledTable, StyledThead, StyledTbody, StyledTr, StyledTh, StyledTd } from './Table.styles';

function Table({ columns, data, renderRow, emptyMessage = "Nenhum dado encontrado." }) {

  return (
    <StyledTable>
      <StyledThead>
        <StyledTr>
          {columns.map((col, index) => (
            <StyledTh key={col.key || index}>{col.label}</StyledTh>
          ))}
        </StyledTr>
      </StyledThead>
      <StyledTbody>
        {data.length === 0 ? (
          <StyledTr>
            <StyledTd colSpan={columns.length}>{emptyMessage}</StyledTd>
          </StyledTr>
        ) : (
          data.map((item, index) => renderRow(item, index))
        )}
      </StyledTbody>
    </StyledTable>
  );
}

export default Table;