import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import OpenPokeballImg from "../../../assets/images/open_pokeball.png";
import ElevatedButton from "../Button/ElevatedButton";

const FallBackUI = ({ text, hasNavigateBtn }) => {
  const navigate = useNavigate();
  const goToMainPage = () => navigate("/");

  const { t } = useTranslation();

  return (
    <Wrapper>
      <Image src={OpenPokeballImg} alt={t("pokeball")} />
      <Text>{text}</Text>
      {hasNavigateBtn && (
        <Button type="button" onClick={goToMainPage}>
          {t("goToMainPage")}
        </Button>
      )}
    </Wrapper>
  );
};

export default FallBackUI;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  font-family: "HANAMDAUM";
  font-size: var(--fs-md);
  text-align: center;
`;

const Image = styled.img`
  display: block;
`;

const Text = styled.div`
  white-space: pre-line;
  line-height: 1.5;
`;

const Button = styled.button`
  ${ElevatedButton}
  width: fit-content;
  background-color: var(--selected-option-bg-color);
  color: var(--selected-option-color);
`;
