import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import styled from "styled-components";
import GlobalModal from "./components/Modal/GlobalModal";
import MainPage from "./pages/MainPage/MainPage";
import ValidateDetail from "./pages/DetailPage/ValidateDetail";
import Loader from "./components/common/Loader/Loader";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <MainPage />
              </Suspense>
            }
          />
          <Route
            path="/:pokemonId"
            element={
              <Suspense fallback={<Loader />}>
                <ValidateDetail />
              </Suspense>
            }
          />
        </Routes>
        <GlobalModal />
      </Layout>
    </BrowserRouter>
  );
}

export default App;

const Layout = styled.div`
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: var(--inner-bg-color);
  position: relative;
`;
