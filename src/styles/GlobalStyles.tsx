// src/GlobalStyles.tsx
import { Global } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Poppins, Londrina Solid, sans-serif
      }
    `}
  />
);

export default GlobalStyles;
