import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  faChevronLeft,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  languageState,
  myPokemonsListState,
  pokemonByIdState,
} from "../../recoil";
import IconButton from "../../components/common/Button/IconButton";
import InfoTab from "../../components/Detail/InfoTab/InfoTab";
import EvolutionTab from "../../components/Detail/EvolutionTab/EvolutionTab";
import PokemonInfo from "../../components/common/Pokemon/PokemonInfo";
import PokemonImage from "../../components/common/Pokemon/PokemonImage";
import TabLogoImg from "../../assets/images/tab_logo.png";
import { useTranslation } from "react-i18next";
import { LOCALSTORAGE_KEY_MY_POKEMONS } from "../../constants";

const TabNames = {
  INFO: "info",
  EVOL: "evol",
};

const DetailPage = ({ pokemonId }) => {
  // 포켓몬 관련 데이터
  const pokemon = useRecoilValue(pokemonByIdState(pokemonId));
  const { id, names, types, sprites } = pokemon;
  const majorType = types[0].type.name;

  const [myPokemonsList, setMyPokemonsList] =
    useRecoilState(myPokemonsListState);
  const isMine = myPokemonsList.includes(String(pokemonId));

  // 포켓몬 잡기/놓아주기
  const togglePokemon = () => {
    const localMyPokemonsList =
      JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_MY_POKEMONS)) || [];

    let newMyPokemonsList = localMyPokemonsList;
    if (!isMine) {
      newMyPokemonsList.push(pokemonId);
    } else {
      newMyPokemonsList = localMyPokemonsList.filter((id) => id !== pokemonId);
    }

    localStorage.setItem(
      LOCALSTORAGE_KEY_MY_POKEMONS,
      JSON.stringify(newMyPokemonsList)
    );
    setMyPokemonsList(newMyPokemonsList);
  };

  // 탭 전환
  const [activeTab, setActiveTab] = useState(TabNames.INFO);

  // 페이지 이동
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  // 언어 설정
  const { t } = useTranslation();
  const language = useRecoilValue(languageState);

  return (
    <Wrapper majorType={majorType}>
      <NavBar>
        <IconButton icon={faChevronLeft} fontSize="20px" onClick={goBack} />
        <IconButton
          icon={isMine ? fasHeart : farHeart}
          color={isMine ? "var(--heart-color)" : null}
          fontSize="20px"
          onClick={togglePokemon}
        />
      </NavBar>
      <Pokemon>
        <PokemonImage
          imgPath={sprites.other["official-artwork"].front_default}
          alt={names[language]}
        />
        <PokemonInfo id={id} names={names} types={types} />
      </Pokemon>
      <Tabs>
        <Tab
          onClick={() => setActiveTab(TabNames.INFO)}
          active={activeTab === TabNames.INFO}
        >
          {t(TabNames.INFO)}
        </Tab>
        <Tab
          onClick={() => setActiveTab(TabNames.EVOLUTION)}
          active={activeTab === TabNames.EVOLUTION}
        >
          {t(TabNames.EVOL)}
        </Tab>
      </Tabs>
      <Main>
        {activeTab === TabNames.INFO && (
          <InfoTab pokemon={pokemon} majorType={majorType} />
        )}
        {activeTab === TabNames.EVOLUTION && (
          <EvolutionTab pokemon={pokemon} majorType={majorType} />
        )}
      </Main>
    </Wrapper>
  );
};

export default DetailPage;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme, majorType }) => theme.typeBgColors[majorType]};
`;

const NavBar = styled.nav`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Pokemon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 30px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px 0;
  font-size: var(--fs-xl);
  background: ${({ active }) =>
    active && `url(${TabLogoImg}) no-repeat center top`};
  color: var(--inner-bg-color);
`;

const Main = styled.main`
  flex: 1;
  padding: 40px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: var(--inner-bg-color);
`;
