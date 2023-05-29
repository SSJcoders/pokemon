import { useState, useEffect } from "react";
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
import Loader from "../components/Loader";

function Home() {
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [autocompleteList, setAutocompleteList] = useState([]);

  const [sort, setSort] = useState("num_asc");
  const [filters, setFilters] = useState([]);

  const [modal, setModal] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setKeyword(input.toLowerCase());
  };

  const handleSearchInput = (e) => {
    const searchInput = e.target.value;
    setInput(searchInput);

    setAutocompleteList(
      searchInput.length > 0
        ? initialPokemonList.filter(({ names }) => {
            return names["kr"].startsWith(searchInput);
          })
        : []
    );
  };

  const resetSearchInput = () => {
    setInput("");
    setKeyword("");
    setAutocompleteList([]);
  };

  const removeFilter = (selectedFilter) =>
    setFilters((prev) => prev.filter((option) => option !== selectedFilter));

  const resetSearchFilter = () => {
    setInput("");
    setKeyword("");
    setFilters([]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sort, filters]);

  const [loading, initialPokemonList] = usePokemon();

  const pokemonList = initialPokemonList
    // 검색
    .filter(({ names, id }) => {
      return names["kr"].includes(keyword) || id === Number(keyword);
    })
    // 필터링
    .filter(({ types }) => {
      const myTypes = types.map((type) => type.type.name);
      return filters.length > 0
        ? myTypes.some((myType) => filters.includes(myType))
        : true;
    })
    // 정렬
    .sort((a, b) => {
      switch (sort) {
        case "num_asc":
          return a.id - b.id;
        case "num_desc":
          return b.id - a.id;
        case "name_asc":
          return b.names["kr"] > a.names["kr"]
            ? -1
            : b.names["kr"] < a.names["kr"]
            ? 1
            : 0;
        case "name_desc":
          return a.names["kr"] > b.names["kr"]
            ? -1
            : a.names["kr"] < b.names["kr"]
            ? 1
            : 0;
        default:
          return a.id - b.id;
      }
    });

  return (
    <Container>
      <Header>
        <NavBar>
          <Icon size="lg" icon="fa-globe" />
          <Icon size="lg" icon="fa-heart" />
        </NavBar>
        <Title onClick={() => window.location.reload()}>
          <TitleLogo src={Logo} alt="포켓몬도감 로고" />
          <TitleText>포켓몬도감</TitleText>
        </Title>
        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchBar>
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
          </SearchBar>
          {input.length > 0 && autocompleteList.length > 0 ? (
            <SearchDropdown>
              {autocompleteList.map((word) => {
                return (
                  <SearchDropdownItem isHover={true}>
                    <img
                      src={word.sprites.front_default}
                      alt={word.names["kr"]}
                    />
                    <span> {word.names["kr"]}</span>
                    <Icon size="md" icon="fa-chevron-right" />
                  </SearchDropdownItem>
                );
              })}
            </SearchDropdown>
          ) : null}
          {input.length > 0 && autocompleteList.length === 0 ? (
            <SearchDropdown>
              <SearchDropdownItem isHover={false}>
                <Icon size="md" icon="fa-magnifying-glass" />
                <span>검색 결과가 없습니다.</span>
              </SearchDropdownItem>
            </SearchDropdown>
          ) : null}
        </SearchForm>

        <SearchResultController>
          <Results hide={loading}>총 {pokemonList.length}마리 포켓몬</Results>
          <Controller>
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
          </Controller>
        </SearchResultController>
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

      {loading ? (
        <Loader />
      ) : (
        <>
          {pokemonList?.length > 0 ? (
            <PokemonList>
              {pokemonList?.map((pokemon) => (
                <PokemonItem key={pokemon.name} pokemon={pokemon} />
              ))}
            </PokemonList>
          ) : (
            <NoList>
              <Message>포켓몬이 존재하지 않습니다.</Message>
              <ResetSearchFilter onClick={resetSearchFilter}>
                <i className="fas fa-arrow-rotate-right" />
                <span>모든 검색 필터 초기화</span>
              </ResetSearchFilter>
            </NoList>
          )}
        </>
      )}

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

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.white};
  position: relative;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  padding: 10px 30px;
  background: ${(props) => props.theme.colors.white} url(${Pokeball}) no-repeat
    center top / 105%;
  z-index: 1;

  @media (max-width: 480px) {
    padding: 10px 20px;
  }
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
  margin-bottom: 10px;
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
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;
`;

const SearchBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 9px 18px;
  background-color: ${(props) => props.theme.colors.lightgray};
  border-radius: 10px;

  @media (max-width: 480px) {
    padding: 9px;
  }
`;

const SearchDropdown = styled.ul`
  position: absolute;
  top: 50px;
  width: 100%;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  border-top: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 1;
`;

const SearchDropdownItem = styled.li`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 18px;
  font-size: 16px;
  line-height: 40px;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }

  i {
    color: ${(props) => props.theme.colors.gray};
  }

  span {
    width: 100%;
    margin-left: 9px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${(props) =>
        props.isHover ? props.theme.colors.autocompleteHover : null};
    }
  }
`;

const Input = styled.input`
  width: 100%;
  margin-left: 9px;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: inherit;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    margin-left: 4.5px;
  }
`;

const SearchResultController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 6px;
`;

const Results = styled.span`
  font-family: "HANAMDAUM";
  font-size: 14px;
  visibility: ${(props) => props.hide && "hidden"};
`;

const FilterOptionList = styled(DefaultFilterOptionList)`
  margin-bottom: 0px;
  column-gap: 10px;
  row-gap: 5px;
  padding: 0 6px;
`;

const FilterOption = styled(DefaultFilterOption)`
  i {
    font-size: 12px;
  }
`;

const Controller = styled.nav`
  display: flex;
`;

const PokemonList = styled.div`
  padding: 0px 30px 20px;
  overflow: auto;

  @media (max-width: 480px) {
    padding: 0px 20px 20px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
`;

const Message = styled.span`
  text-align: center;
  font-family: "HANAMDAUM";
  font-size: 16px;
  line-height: 1.3;
`;

const ResetSearchFilter = styled.div`
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
