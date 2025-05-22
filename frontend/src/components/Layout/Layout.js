import React from 'react';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import { MainContent } from './Layout.styles';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Navbar />
      <MainContent>
        {children}
      </MainContent>
    </>
  );
}

export default Layout;
