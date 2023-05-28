import { useState } from "react";
import styled from "styled-components";
import usePokemon from "../hooks/usePokemon";
import PokemonItem from "../components/PokemonItem";
import Modal from "../components/Modal";
import Icon from "../components/Icon";
import Pokeball from "../assets/pokeball-lg.png";
import Logo from "../assets/logo.png";
import {
  FilterOptionList as DefaultFilterOptionList,
  FilterOption as DefaultFilterOption,
} from "../components/FilterModal";

function Main() {
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");

  const [sort, setSort] = useState("num_asc");
  const [filters, setFilters] = useState([]);

  const [modal, setModal] = useState("");

  const handleSearchInput = (e) => {
    const searchInput = e.target.value;
    setInput(searchInput);
    setKeyword(searchInput.toLowerCase());
  };

  const resetSearchInput = () => {
    setInput("");
    setKeyword("");
  };

  const removeFilter = (selectedFilter) =>
    setFilters((prev) => prev.filter((option) => option !== selectedFilter));

  const resetFilter = () => setFilters([]);

  const pokemonList = usePokemon()
    // 검색
    .filter(({ name, id }) => {
      return name.includes(keyword) || id === Number(keyword);
    })
    // 필터링
    .filter(({ types }) => {
      const myTypes = types.map((type) => type.type.name);
      return filters.every((filter) => myTypes.includes(filter));
    })
    // 정렬
    .sort((a, b) => {
      switch (sort) {
        case "num_asc":
          return a.id - b.id;
        case "num_desc":
          return b.id - a.id;
        case "name_asc":
          return b.name > a.name ? -1 : b.name < a.name ? 1 : 0;
        case "name_desc":
          return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
        default:
          return a.id - b.id;
      }
    });

  return (
    <Container>
      <Wrapper>
        <Header>
          <NavBar>
            <Icon size="lg" icon="fa-moon" />
            <Icon size="lg" icon="fa-heart" />
          </NavBar>
          <Title onClick={() => window.location.reload()}>
            <TitleLogo src={Logo} alt="포켓몬도감 로고" />
            <TitleText>포켓몬도감</TitleText>
          </Title>
          <SearchForm>
            <Icon size="md" icon="fa-magnifying-glass" />
            <Input
              type="text"
              placeholder="포켓몬 이름 또는 번호를 입력하세요."
              value={input}
              onChange={handleSearchInput}
            ></Input>
            <Icon
              size="md"
              icon="fa-xmark"
              onClick={resetSearchInput}
              hide={input === ""}
            />
          </SearchForm>
          <SearchBar>
            <Results>총 {pokemonList.length}마리 포켓몬</Results>
            <Controllers>
              <Icon
                size="md"
                icon="fa-arrow-down-short-wide"
                onClick={() => setModal("sort")}
              />
              <Icon
                size="md"
                icon="fa-sliders"
                onClick={() => setModal("filter")}
              />
            </Controllers>
          </SearchBar>
          <FilterOptionList>
            {filters.map((option) => (
              <FilterOption
                key={option}
                filter={option}
                active={true}
                onClick={() => removeFilter(option)}
              >
                <img
                  src={process.env.PUBLIC_URL + `/assets/badges/${option}.png`}
                  alt={option}
                />
                <span>{option}</span>
                <i className="fa-solid fa-xmark" />
              </FilterOption>
            ))}
          </FilterOptionList>
        </Header>

        {pokemonList.length > 0 ? (
          <PokemonList>
            {pokemonList?.map((pokemon) => (
              <PokemonItem key={pokemon.name} pokemon={pokemon}>
                {pokemon.name}
              </PokemonItem>
            ))}
          </PokemonList>
        ) : (
          <NoList>
            <Message>포켓몬이 존재하지 않습니다.</Message>
            <ResetFilter onClick={resetFilter}>
              <i className="fas fa-arrow-rotate-right" />
              <span>모든 검색 필터 초기화</span>
            </ResetFilter>
          </NoList>
        )}
      </Wrapper>

      <Modal
        kind={modal}
        closeModal={() => setModal("")}
        option={modal === "sort" ? sort : modal === "filter" ? filters : null}
        setOption={
          modal === "sort" ? setSort : modal === "filter" ? setFilters : null
        }
      />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: ${(props) => props.theme.colors.bg} url(${Pokeball}) no-repeat
    center -10px / contain;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px 40px 0px;

  @media (max-width: 480px) {
    padding: 10px 20px 0px;
  }
`;

const Header = styled.header`
  margin-bottom: 10px;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-inline-end: -5px;
`;

const Title = styled.div`
  display: inline-flex;
  column-gap: 7.5px;
  margin-bottom: 15px;
  cursor: pointer;

  @media (max-width: 320px) {
    transform: scale(0.9);
    margin-left: -10px;
  }
`;

const TitleLogo = styled.img``;

const TitleText = styled.h1`
  display: inline;
  font-family: "HANAMDAUM";
  font-size: 28px;
`;

const SearchForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 9px 18px;
  background-color: #f4f5f5;
  border-radius: 10px;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    padding: 9px;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-left: 9px;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: "HANAMDAUM";
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    margin-left: 4.5px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 6px;
`;

const Results = styled.span`
  font-family: "HANAMDAUM";
  font-size: 12px;
  position: relative;
  top: 2px;
`;

const FilterOptionList = styled(DefaultFilterOptionList)`
  margin-bottom: 0px;
  column-gap: 10px;
  row-gap: 5px;
`;

const FilterOption = styled(DefaultFilterOption)`
  i {
    font-size: 12px;
  }
`;

const Controllers = styled.nav`
  display: flex;
`;

const PokemonList = styled.main`
  padding: 20px 0;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoList = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

const Message = styled.span`
  text-align: center;
  font-family: "HANAMDAUM";
  font-size: 16px;
  line-height: 1.3;
`;

const ResetFilter = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding: 15px;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  color: ${(props) => props.theme.colors.gray};
  font-size: 16px;
  cursor: pointer;

  i {
    font-size: 12px;
  }
`;
