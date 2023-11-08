import styled from "styled-components";
import AppLogoImg from "../../../assets/images/app_logo.png";
import { useTranslation } from "react-i18next";

const AppLogo = () => {
  const { t } = useTranslation();

  return (
    <Wrapper onClick={() => window.location.reload()}>
      <Image src={AppLogoImg} alt={`${t("appTitle")}  ${t("logo")}}`} />
      <Text>{t("appTitle")}</Text>
    </Wrapper>
  );
};

export default AppLogo;

const Wrapper = styled.button`
  display: inline-flex;
  column-gap: 7.5px;
  padding: 2px;
  margin-bottom: 10px;
`;

const Image = styled.img``;

const Text = styled.h1`
  display: inline;
  font-family: "HANAMDAUM";
  font-size: var(--fs-3xl);
`;
