import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import DashboardPage from './pages/DashboardPage';
import GlobalStyles from './styles/GlobalStyles'; 
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/defaultTheme'; 

function App() {
  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/agendamento" element={<DashboardPage />} />
            <Route path="/atendimentos" element={<DashboardPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;