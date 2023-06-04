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
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { Link } from "react-router-dom";

function Home() {
  // 검색 관련 state
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState([]);
  const [selectedDropdownItemIdx, setSelectedDropdownItemIdx] = useState(-1);

  // 정렬, 필터 관련 state
  const [modal, setModal] = useState("");
  const [sort, setSort] = useState("num_asc");
  const [filters, setFilters] = useState([]);

  // 검색, 필터, 정렬을 반영한 포켓몬 목록
  const [isLoading, initialPokemonList] = usePokemon();
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

  // 무한스크롤 관련
  const OFFSET = 20;
  const [page, setPage] = useState(1);
  const hasMorePage = Boolean(pokemonList.length > page * OFFSET);
  const lastElementRef = useInfiniteScroll(isLoading, hasMorePage, setPage);

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

    if (isDropdownVisible && selectedDropdownItemIdx >= 0) {
      const selectedPokemonName =
        autocompleteList[selectedDropdownItemIdx].names["kr"];
      setInput(selectedPokemonName);
      setQuery(selectedPokemonName);
    } else {
      setQuery(input.toLowerCase());
    }

    setIsDropdownVisible(false);
    setSelectedDropdownItemIdx(-1);
  };

  // 자동완성 포켓몬 클릭 시 검색 실행
  const runQueryByAutocompleteClick = (pokemon) => {
    const name = pokemon.names["kr"];
    setInput(name);
    setQuery(name);
    setIsDropdownVisible(false);
  };

  // 키보드 방향키로 자동완성 선택
  const selectDropdownItem = (e) => {
    if (!isDropdownVisible || autocompleteList.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSelectedDropdownItemIdx((prev) =>
        selectedDropdownItemIdx === autocompleteList.length - 1 ? 0 : prev + 1
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (autocompleteList.length === 1) {
        setSelectedDropdownItemIdx(-1);
        setIsDropdownVisible(false);
        return;
      }

      setSelectedDropdownItemIdx((prev) =>
        selectedDropdownItemIdx === 0 ? autocompleteList.length - 1 : prev - 1
      );
    }
  };

  // 검색창의 x 버튼 눌렀을 때 검색창 초기화
  const resetSearch = () => {
    setInput("");
    setIsDropdownVisible(false);
    setAutocompleteList([]);
    setSelectedDropdownItemIdx(-1);
  };

  // 선택된 필터 삭제
  const removeSelectedFilter = (selectedFilter) => {
    setFilters((prev) => prev.filter((option) => option !== selectedFilter));
  };

  // 정렬, 필터, 검색어 변경 시 화면 상단 이동 및 무한스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(1);
  }, [sort, filters, query]);

  // 검색폼 바깥 영역 클릭 시 드롭다운 닫기
  const searchFormRef = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      if (!searchFormRef.current) return;

      if (!searchFormRef.current.contains(e.target)) {
        setIsDropdownVisible(false);
        setSelectedDropdownItemIdx(-1);
      } else {
        setIsDropdownVisible(true);
      }
    };

    document.addEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
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
            <SearchInput
              type="text"
              placeholder="포켓몬 이름 또는 번호를 입력하세요."
              value={input}
              onChange={matchAutocomplete}
              onKeyDown={selectDropdownItem}
            ></SearchInput>
            <Icon
              size="md"
              icon="fa-xmark"
              onClick={resetSearch}
              hide={input === ""}
            />
          </SearchBar>
          {isDropdownVisible && (
            <SearchDropdown>
              {autocompleteList.map((pokemon, idx) => {
                const notMatchedPokemonName = pokemon.names["kr"].substr(
                  input.length
                );
                return (
                  <SearchDropdownItem
                    key={pokemon.name}
                    isSelected={idx === selectedDropdownItemIdx}
                    onClick={() => runQueryByAutocompleteClick(pokemon)}
                  >
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.names["kr"]}
                    />
                    <p>
                      <strong>{input}</strong>
                      <span>{notMatchedPokemonName}</span>
                    </p>
                    <Icon size="md" icon="fa-chevron-right" />
                  </SearchDropdownItem>
                );
              })}
            </SearchDropdown>
          )}
        </SearchForm>
        <SearchResultController>
          <Results hide={isLoading}>총 {pokemonList.length}마리 포켓몬</Results>
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

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {pokemonList?.length > 0 ? (
            <PokemonList>
              {pokemonList?.slice(0, page * OFFSET).map((pokemon, index) => {
                return (
                  <Link
                    to={`/${pokemon.id}`}
                    state={{ pokemon: pokemon }}
                    key={pokemon.name}
                    style={{ textDecoration: "none" }}
                  >
                    {page * OFFSET === index + 1 ? (
                      <PokemonItem ref={lastElementRef} pokemon={pokemon} />
                    ) : (
                      <PokemonItem pokemon={pokemon} />
                    )}
                  </Link>
                );
              })}
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
    </>
  );
}

export default Home;

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
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 0 18px;
  font-size: 16px;
  line-height: 40px;
  cursor: pointer;

  @media (max-width: 480px) {
    padding: 0 8px 0 9px;
  }

  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }

  i {
    color: ${(props) => props.theme.colors.gray};
  }

  p {
    flex: 1;
    margin-left: 9px;
    strong {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  background-color: ${(props) =>
    props.isSelected && props.theme.colors.autocompleteHover};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${(props) => props.theme.colors.autocompleteHover};
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  margin-left: 9px;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: inherit;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:placeholder-shown {
    overflow: hidden;
    text-overflow: ellipsis;
  }

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
