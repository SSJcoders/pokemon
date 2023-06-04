import { Outlet } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import theme from "./theme";
import PretendardWoff2 from "./fonts/Pretendard-Regular.woff2";
import PretendardWoff from "./fonts/Pretendard-Regular.woff";

const GlobalStyle = createGlobalStyle`
${reset};

@font-face {
  font-family: "pretendard";
  src: url(${PretendardWoff2}) format("woff2"),
  url(${PretendardWoff}) format("woff");
}

@font-face {
    font-family: 'HANAMDAUM';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/HANAMDAUM.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

*{
  box-sizing: border-box;
}

body{
  font-family: "pretendard";
  background-color: #E6E8F2;
}

`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}

export default App;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.white};
  position: relative;
`;
