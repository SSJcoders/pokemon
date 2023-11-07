import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import { languageState } from "../../recoil";
import { LOCALSTORAGE_KEY } from "../../constants";
import ModalHeader from "./ModalHeader";
import ElevatedButton from "../common/Button/ElevatedButton";

const LanguageModal = () => {
  const { closeModal } = useModal();

  const [language, setLanguage] = useRecoilState(languageState);

  const { t } = useTranslation();

  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;

    localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify({ language: selectedLanguage })
    );

    setLanguage(selectedLanguage);
    closeModal();
  };

  return (
    <Wrapper>
      <ModalHeader title={t("language")} />
      <>
        <LangButton
          onClick={changeLanguage}
          value="ko"
          selected={language === "ko"}
        >
          {t("languageOptions.ko")}
        </LangButton>
        <LangButton
          onClick={changeLanguage}
          value="en"
          selected={language === "en"}
        >
          {t("languageOptions.en")}
        </LangButton>
      </>
    </Wrapper>
  );
};

export default LanguageModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const LangButton = styled.button`
  ${ElevatedButton}
`;
