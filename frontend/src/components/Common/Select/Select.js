import React from 'react';
import { StyledSelect, SelectWrapper, StyledLabel } from './Select.styles';

function Select({ id, label, value, onChange, options, required, ...props }) {
  return (
    <SelectWrapper className="form-group">
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledSelect
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
}

export default Select;