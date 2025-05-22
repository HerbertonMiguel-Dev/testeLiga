import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: var(--secondary-color);
  padding: var(--spacing-sm) var(--spacing-lg);
  box-shadow: var(--shadow-light);
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
  }
  li {
    margin: 0 var(--spacing-md);
  }
  a {
    color: var(--text-color-light);
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s ease;
    &:hover {
      color: var(--primary-hover-color);
    }
  }
  @media (max-width: 768px) {
    ul {
      flex-direction: column;
      align-items: center;
    }
    li {
      margin: var(--spacing-xs) 0;
    }
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/agendamento">Agendamento</Link></li>
        <li><Link to="/atendimentos">Atendimentos</Link></li>
      </ul>
    </NavbarContainer>
  );
}

export default Navbar;
