import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import "./fonts.css";
import "./global.css";

const GlobalStyle = createGlobalStyle`${css`
  ${reset};

  *,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Pretendard";
    background-color: var(--outer-bg-color);
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
    background: transparent;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
    line-height: inherit;
  }
`}
`;

export default GlobalStyle;
