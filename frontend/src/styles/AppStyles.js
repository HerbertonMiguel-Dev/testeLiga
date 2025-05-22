import styled from 'styled-components';

const breakpoints = {
  desktop: '1200px',
  tablet: '768px',
  mobile: '480px',
};

export const Header = styled.header`
  background-color: #4CAF50;
  color: white;
  padding: 1rem 0;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.5rem;
    padding: 0.8rem 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.2rem;
    padding: 0.5rem 0;
  }
`;

export const Main = styled.main`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 95%;
    padding: 15px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin: 10px auto;
    padding: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin: 5px auto;
    padding: 10px;
  }
`;

export const Section = styled.section`
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;

  h2 {
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-size: 1.6rem;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1.4rem;
    }
    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.2rem;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 30px;
    padding: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 20px;
    padding: 10px;
  }
`;

export const CardListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`;

export const CardList = styled.div`
  flex: 1;
  min-width: 300px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;

  h3 {
    margin-top: 0;
    color: #555;
    font-size: 1.3rem;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1.2rem;
    }
    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.1rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background-color: #e9e9e9;
    margin-bottom: 8px;
    padding: 10px;
    border-radius: 4px;
    font-size: 0.95rem;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.9rem;
      padding: 8px;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex: unset;
    width: 100%;
    min-width: unset;
  }
`;

export const Form = styled.form`
  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 1rem;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.9rem;
    }
  }

  input[type="text"],
  input[type="date"],
  input[type="datetime-local"],
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;

    @media (max-width: ${breakpoints.mobile}) {
      padding: 8px;
      font-size: 14px;
    }
  }
`;

export const HorariosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 5px;
  }
`;

export const HorarioItem = styled.div`
  background-color: #e0f7fa;
  border: 1px solid #b2ebf2;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 1rem;

  &.ocupado {
    background-color: #ffcdd2;
    border-color: #ef9a9a;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &.selecionado {
    background-color: #a5d6a7;
    border-color: #66bb6a;
    font-weight: bold;
  }

  &:not(.ocupado):hover {
    background-color: #80deea;
  }

  small {
    display: block;
    margin-top: 5px;
    font-size: 0.8em;
    color: #666;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px;
    font-size: 0.9rem;

    small {
      font-size: 0.75em;
    }
  }
`;

export const Filters = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  label, input, button {
    margin-right: 10px;
    margin-bottom: 10px;
    flex-shrink: 0;
  }

  input[type="date"],
  input[type="text"] {
    flex-grow: 1;
    min-width: 120px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;

    label, input, button {
      margin-right: 0;
      width: 100%;
      box-sizing: border-box;
    }

    input[type="date"],
    input[type="text"] {
      max-width: 100%;
    }
  }
`;

export const ActionButton = styled.button`
  background-color: #2196F3;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  margin-right: 10px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1976D2;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
    padding: 12px 10px;
    font-size: 15px;
  }
`;

export const AtenderButton = styled(ActionButton)`
  background-color: #ff9800;
  margin-top: 0;

  &:hover {
    background-color: #fb8c00;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: auto;
    padding: 8px 10px;
    font-size: 14px;
  }
`;
