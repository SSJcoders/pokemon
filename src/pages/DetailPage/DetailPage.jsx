import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { pokemonByIdState } from "../../recoil";
import IconButton from "../../components/common/Button/IconButton";
import InfoTab from "../../components/Detail/InfoTab/InfoTab";
import EvolutionTab from "../../components/Detail/EvolutionTab/EvolutionTab";
import PokemonInfo from "../../components/common/Pokemon/PokemonInfo";
import PokemonImage from "../../components/common/Pokemon/PokemonImage";
import TabLogoImg from "../../assets/images/tab_logo.png";
import { useTranslation } from "react-i18next";

const TabNames = {
  INFO: "info",
  EVOL: "evol",
};

const DetailPage = ({ pokemonId }) => {
  const pokemon = useRecoilValue(pokemonByIdState(pokemonId));
  const { id, names, types, sprites } = pokemon;
  const majorType = types[0].type.name;

  const [activeTab, setActiveTab] = useState(TabNames.INFO);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const { t } = useTranslation();

  return (
    <Wrapper majorType={majorType}>
      <NavBar>
        <IconButton icon={faChevronLeft} fontSize="20px" onClick={goBack} />
      </NavBar>
      <Pokemon>
        <PokemonImage
          imgPath={sprites.other["official-artwork"].front_default}
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
