import styled from 'styled-components';

// Definir alguns breakpoints comuns para facilitar
const breakpoints = {
  desktop: '1200px', // Usado para max-width da Main
  tablet: '768px',
  mobile: '480px',
};

export const Header = styled.header`
  background-color: #4CAF50;
  color: white;
  padding: 1rem 0;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem; /* Tamanho da fonte padrão para desktop */

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.5rem; /* Menor em tablets */
    padding: 0.8rem 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.2rem; /* Ainda menor em celulares */
    padding: 0.5rem 0;
  }
`;

export const Main = styled.main`
  max-width: 1200px; /* Mantém o máximo em desktop */
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 95%; /* Ocupa mais largura em telas menores que desktop mas maiores que tablet */
    padding: 15px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin: 10px auto; /* Margem menor em tablets */
    padding: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin: 5px auto; /* Margem mínima em celulares */
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
    font-size: 1.6rem; /* Tamanho da fonte padrão */

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
  flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha */

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column; /* Em tablets, empilha as CardLists */
    gap: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`;

export const CardList = styled.div`
  flex: 1; /* Ocupa o espaço disponível em telas grandes */
  min-width: 300px; /* Garante uma largura mínima antes de quebrar */
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
    flex: unset; /* Remove o flex-grow, permitindo que cada CardList ocupe a largura total */
    width: 100%; /* Ocupa a largura total em tablets e celulares */
    min-width: unset; /* Remove a largura mínima */
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

  /* Ajustar inputs e selects para telas menores */
  input[type="text"],
  input[type="date"],
  input[type="datetime-local"],
  select {
    width: 100%; /* Ocupa a largura total do container pai */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box; /* Garante que padding e border não adicionem largura extra */

    @media (max-width: ${breakpoints.mobile}) {
      padding: 8px;
      font-size: 14px;
    }
  }
`;

export const HorariosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* Padrão: 120px mínimo */
  gap: 10px;
  margin-top: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /* Diminui o min-width em tablets */
    gap: 8px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); /* Ainda menor em celulares */
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
  font-size: 1rem; /* Tamanho da fonte padrão */

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
    font-size: 0.9rem; /* Diminui a fonte */
    small {
      font-size: 0.75em;
    }
  }
`;

export const Filters = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha */
  gap: 10px; /* Espaçamento entre os itens do filtro */

  label, input, button {
    margin-right: 10px; /* Manter margem direita para espaçamento */
    margin-bottom: 10px; /* Adiciona margem inferior para empilhamento */
    flex-shrink: 0; /* Impede que os itens encolham demais */
  }

  /* Ajuste para inputs de filtro para ocupar mais espaço em telas pequenas */
  input[type="date"],
  input[type="text"] {
    flex-grow: 1; /* Permite que cresçam para preencher o espaço */
    min-width: 120px; /* Largura mínima para inputs de data/texto */
  }

  /* Em telas menores, os inputs e botões podem se empilhar melhor */
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column; /* Empilha os filtros */
    align-items: flex-start; /* Alinha à esquerda */
    gap: 5px; /* Reduz o gap */

    label, input, button {
      margin-right: 0; /* Remove margem direita quando empilhado */
      width: 100%; /* Ocupa a largura total */
      box-sizing: border-box; /* Garante que padding e border sejam incluídos no width */
    }

    input[type="date"],
    input[type="text"] {
      max-width: 100%; /* Garante que não ultrapasse 100% da largura */
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
  margin-top: 10px; /* Ajustado para separar do HorariosGrid ou formulário */
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
    width: 100%; /* Botões ocupam largura total em mobile */
    margin-right: 0;
    margin-bottom: 10px; /* Espaçamento entre botões empilhados */
    padding: 12px 10px; /* Um pouco mais de padding vertical */
    font-size: 15px;
  }
`;

export const AtenderButton = styled(ActionButton)`
  background-color: #ff9800;
  margin-top: 0; /* Remove margem superior extra para não empurrar muito dentro da célula da tabela */
  &:hover {
    background-color: #fb8c00;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: auto; /* Pode ser menor em tabela para caber na célula */
    padding: 8px 10px; /* Menor padding */
    font-size: 14px;
  }
`;