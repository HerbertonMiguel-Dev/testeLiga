import React from 'react';
import Header from './Header/Header'; // Importe o Header
import Navbar from './Navbar/Navbar'; // Importe o Navbar
import { MainContent } from './Layout.styles'; // Importe o estilo para o conteúdo principal

function Layout({ children }) {
  return (
    <>
      <Header />
      <Navbar /> {/* Componente de navegação principal */}
      <MainContent>
        {children} {/* As páginas (AgendamentoPage, AtendimentosPage, etc.) serão renderizadas aqui */}
      </MainContent>
      {/* Opcional: Adicione um Footer aqui se precisar */}
    </>
  );
}

export default Layout;