import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { languageState } from "./recoil";
import GlobalModal from "./components/Modal/GlobalModal";
import MainPage from "./pages/MainPage/MainPage";
import ValidateDetail from "./pages/DetailPage/ValidateDetail";
import MyPokemonsPage from "./pages/MyPokemonsPage/MyPokemonsPage";
import Loader from "./components/common/Loader/Loader";
import ScrollToTop from "./components/common/ScrollToTop";
import ErrorBoundary from "./components/common/Error/ErrorBoundary";

function App() {
  const language = useRecoilValue(languageState);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                  <MainPage />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="/:pokemonId"
            element={
              <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                  <ValidateDetail />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route path="/mypokemons" element={<MyPokemonsPage />} />
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
