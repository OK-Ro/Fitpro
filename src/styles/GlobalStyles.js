import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    primary: "#007BFF",
    primaryLight: "#66B2FF",
    secondary: "#28A745",
    background: "#F0F4F8",
    cardBackground: "#FFFFFF",
    text: "#212529",
    textLight: "#6C757D",
    white: "#FFFFFF",
    success: "#28A745",
    warning: "#FFC107",
    danger: "#DC3545",
  },
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  fontSizes: {
    small: "0.875rem",
    medium: "1rem",
    large: "1.25rem",
    xlarge: "1.5rem",
    xxlarge: "2rem",
  },
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${(props) => props.theme.fonts.body};
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    line-height: 1.6;
   
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 600;
  }

  button {
    font-family: ${(props) => props.theme.fonts.body};
  }
`;
