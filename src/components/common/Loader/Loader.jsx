import { useTranslation } from "react-i18next";
import styled from "styled-components";
import LoaderImg from "../../../assets/images/loader.gif";

function Loader() {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Image src={LoaderImg} alt={t("loading")} />
      <Text>{t("loading")}</Text>
    </Wrapper>
  );
}

export default Loader;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 40px;
  overflow: hidden;
`;

const Image = styled.img`
  transform: scale(2);
`;

const Text = styled.div`
  font-family: "HANAMDAUM";
  font-size: var(--fs-xl);
`;
