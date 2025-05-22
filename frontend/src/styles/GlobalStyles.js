import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #4CAF50;
    --primary-hover-color: #45a049;
    --secondary-color: #007bff;
    --secondary-hover-color: #0056b3;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;

    --background-light: #f4f4f4;
    --background-card: #ffffff;
    --background-even-row: #f2f2f2;
    --text-color-dark: #333;
    --text-color-light: #fff;
    --border-color: #ccc;
    --shadow-light: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-medium: 0 4px 8px rgba(0, 0, 0, 0.15);

    --font-family-base: Arial, sans-serif;
    --font-size-base: 16px;
    --line-height-base: 1.6;

    --spacing-xs: 5px;
    --spacing-sm: 10px;
    --spacing-md: 15px;
    --spacing-lg: 20px;
    --spacing-xl: 30px;

    --border-radius-sm: 4px;
    --border-radius-md: 8px;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    background-color: var(--background-light);
    color: var(--text-color-dark);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ul {
    list-style: none;
  }
`;

export default GlobalStyles;
