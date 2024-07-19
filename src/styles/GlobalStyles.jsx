import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Rosarivo:ital@0;1&display=swap');

body {
    margin: 0;
    padding-top: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 3rem;
    font-family: 'Rosarivo', serif;
    background-color: white;
  }
`;

export default GlobalStyles;
