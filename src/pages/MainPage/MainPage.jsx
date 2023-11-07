import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { processedPokemonListState } from "../../recoil";
import {
  faArrowDownShortWide,
  faGlobe,
  faHeart,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useModal from "../../hooks/useModal";
import { MODAL_TYPES } from "../../constants";
import AppLogo from "../../components/common/Logo/AppLogo";
import IconButton from "../../components/common/Button/IconButton";
import SearchBar from "../../components/Main/SearchBar";
import SelectedFilterOptionList from "../../components/Main/SelectedFilterOptionList";
import PokemonItem from "../../components/common/Pokemon/PokemonItem";
import NotFound from "../../components/common/NotFound/NotFound";
import PokeballLgImg from "../../assets/images/pokeball_lg.png";

const MainPage = () => {
  // 포켓몬 리스트
  const pokemonList = useRecoilValue(processedPokemonListState);

  // 무한스크롤
  const OFFSET = 20;
  const [page, setPage] = useState(1);
  const hasMorePage = Boolean(pokemonList.length > page * OFFSET);
  const lastElementRef = useInfiniteScroll(hasMorePage, setPage);

  // 모달 열기
  const { openModal } = useModal();

  // 언어 설정
  const { t } = useTranslation();

  return (
    <>
      <Header>
        <NavBar>
          <IconButton
            fontSize="20px"
            icon={faGlobe}
            title={t("language")}
            onClick={() => openModal(MODAL_TYPES.LANGUAGE)}
          />
          <IconButton fontSize="20px" icon={faHeart} title={t("wishlist")} />
        </NavBar>
        <AppLogo />
        <SearchBar />
        <Row>
          <SearchCount>
            {t("searchCount", { count: pokemonList.length })}
          </SearchCount>
          <SearchSortFilter>
            <IconButton
              fontSize="18px"
              icon={faArrowDownShortWide}
              title={t("sort")}
              onClick={() => openModal(MODAL_TYPES.SORT)}
            />
            <IconButton
              fontSize="18px"
              icon={faSliders}
              title={t("filter")}
              onClick={() => openModal(MODAL_TYPES.FILTER)}
            />
          </SearchSortFilter>
        </Row>
        <SelectedFilterOptionList />
      </Header>
      {pokemonList.length > 0 ? (
        <PokemonList>
          {pokemonList.slice(0, page * OFFSET).map((pokemon, index) => {
            if (page * OFFSET === index + 1) {
              return (
                <PokemonItem
                  key={pokemon.id}
                  pokemon={pokemon}
                  ref={lastElementRef}
                />
              );
            } else {
              return <PokemonItem key={pokemon.id} pokemon={pokemon} />;
            }
          })}
        </PokemonList>
      ) : (
        <NotFound text={t("noPokemon")} />
      )}
    </>
  );
};

export default MainPage;

const Header = styled.header`
  position: sticky;
  top: 0;
  padding: 10px 30px;
  background: var(--inner-bg-color) url(${PokeballLgImg});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 105%;
  z-index: 1;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const SearchCount = styled.span`
  font-family: "HANAMDAUM";
  font-size: var(--fs-sm);
`;

const SearchSortFilter = styled.div`
  display: flex;
  align-items: center;
`;

const PokemonList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  padding: 30px;

  @media (max-width: 480px) {
    padding: 20px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
