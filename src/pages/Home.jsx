import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import usePokemon from "../hooks/usePokemon";
import PokemonItem from "../components/PokemonItem";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import Icon from "../components/Icon";
import Pokeball from "../assets/pokeball-lg.png";
import Logo from "../assets/logo.png";
import {
  FilterOptionList as DefaultFilterOptionList,
  FilterOption as DefaultFilterOption,
} from "../components/FilterModal";

function Home() {
  // 검색 관련 state
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState([]);

  // 정렬, 필터 관련 state
  const [modal, setModal] = useState("");
  const [sort, setSort] = useState("num_asc");
  const [filters, setFilters] = useState([]);

  // 검색, 필터, 정렬을 반영한 포켓몬 목록
  const [loading, initialPokemonList] = usePokemon();
  const pokemonList = initialPokemonList
    // 검색
    .filter(({ names, id }) => {
      return names["kr"].includes(query) || id === Number(query);
    })
    // 필터
    .filter(({ types }) => {
      const myTypes = types.map((type) => type.type.name);
      return filters.length > 0
        ? filters.some((filter) => myTypes.includes(filter))
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

  // 검색어 입력 시 자동완성 매칭
  const matchAutocomplete = (e) => {
    const searchInput = e.target.value;
    setInput(searchInput);

    if (searchInput.length > 0) {
      setIsDropdownVisible(true);
      setAutocompleteList(
        initialPokemonList.filter(({ names }) => {
          return names["kr"].startsWith(searchInput);
        })
      );
    } else {
      setIsDropdownVisible(false);
      setAutocompleteList([]);
    }
  };

  // 검색폼 제출 시 검색 실행
  const runQuery = (e) => {
    e.preventDefault();
    setQuery(input.toLowerCase());
    setIsDropdownVisible(false);
  };

  // 자동완성 포켓몬 클릭 시 검색 실행
  const runQueryByClickAutocomplete = (pokemon) => {
    const name = pokemon.names["kr"];
    setInput(name);
    setQuery(name);
    setIsDropdownVisible(false);
  };

  // 검색창의 x 버튼 눌렀을 때 검색 초기화
  const resetSearch = () => {
    setInput("");
    setQuery("");
    setIsDropdownVisible(false);
  };

  // 선택된 필터 삭제
  const removeSelectedFilter = (selectedFilter) => {
    setFilters((prev) => prev.filter((option) => option !== selectedFilter));
  };

  // 정렬, 필터 변경 시 화면 상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sort, filters]);

  // 검색폼 바깥 영역 클릭 시 드롭다운 닫기
  const searchFormRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchFormRef.current && !searchFormRef.current.contains(e.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

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
        <SearchForm onSubmit={runQuery} ref={searchFormRef} autoComplete="off">
          <SearchBar>
            <Icon size="md" icon="fa-magnifying-glass" />
            <Input
              type="text"
              placeholder="포켓몬 이름 또는 번호를 입력하세요."
              value={input}
              onChange={matchAutocomplete}
            ></Input>
            <Icon
              size="md"
              icon="fa-xmark"
              onClick={resetSearch}
              hide={input === ""}
            />
          </SearchBar>
          {isDropdownVisible && (
            <SearchDropdown>
              {autocompleteList.map((pokemon) => {
                return (
                  <SearchDropdownItem
                    key={pokemon.name}
                    isHover={true}
                    onClick={() => runQueryByClickAutocomplete(pokemon)}
                  >
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.names["kr"]}
                    />
                    <span> {pokemon.names["kr"]}</span>
                    <Icon size="md" icon="fa-chevron-right" />
                  </SearchDropdownItem>
                );
              })}
            </SearchDropdown>
          )}
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
              onClick={() => removeSelectedFilter(option)}
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
              <p>포켓몬이 존재하지 않습니다.</p>
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
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  border-top: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 1;
  overflow: hidden;
`;

const SearchDropdownItem = styled.li`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 16px 0 18px;
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
  justify-content: center;
  align-items: center;

  p {
    height: min-content;
    font-family: "HANAMDAUM";
    font-size: 16px;
    line-height: 1.3;
    text-align: center;
  }
`;
