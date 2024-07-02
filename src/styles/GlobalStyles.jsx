import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 3rem;
    font-family: 'Roboto', sans-serif;
    background-color: white; /* Set a black background color */
    color: #fff; /* Set the text color to white for better contrast */
  }

  /* Add any other global styles you want */
`;

export default GlobalStyles;
