import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getPokemonSvgImg, random } from "../../../utils";
import { useMemo } from "react";
import { dance } from "../Pokemon/PokemonImage";

function Loader() {
  const randomId = useMemo(() => random(1, 151), []);

  const { t } = useTranslation();

  return (
    <Wrapper>
      <Columns>
        <Text>{t("quiz")}</Text>
        <Text>{t("guess")}</Text>
      </Columns>
      <Image src={getPokemonSvgImg(randomId)} alt={t("randomPokemon")} />
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

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  span:first-child {
    color: var(--quiz-color);
  }
`;

const Text = styled.span`
  font-family: "HANAMDAUM";
  font-size: var(--fs-lg);
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  animation: ${dance} 1s linear infinite 100ms;
`;
