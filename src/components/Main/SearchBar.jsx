import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { languageState, pokemonListState, queryState } from "../../recoil";
import SearchAutoCompleteItem from "./SearchAutoCompleteItem";
import IconButton from "../common/Button/IconButton";

const SearchBar = () => {
  const language = useRecoilValue(languageState);

  const pokemonList = useRecoilValue(pokemonListState);

  const [input, setInput] = useState("");
  const setQuery = useSetRecoilState(queryState);

  const [matchedName, setMatchedName] = useState("");
  const [isAutoCompleteVisible, setIsAutoCompleteVisible] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState([]);
  const [selectedAutoCompleteItemIdx, setSelectedAutoCompleteItemIdx] =
    useState(-1);

  // 검색어 입력 시 콜백함수
  const handleInputChange = (e) => {
    const searchInput = e.target.value;
    setInput(searchInput);
    setMatchedName(searchInput);
    handleAutoComplete(searchInput);
  };

  // 검색 자동완성 처리
  const handleAutoComplete = (searchInput) => {
    const newAutoCompleteList = pokemonList.filter(({ names }) =>
      names[language].startsWith(searchInput.toLowerCase())
    );

    if (searchInput.length > 0 && newAutoCompleteList.length > 0) {
      setIsAutoCompleteVisible(true);
      setAutocompleteList(newAutoCompleteList);
    } else {
      setIsAutoCompleteVisible(false);
      setAutocompleteList([]);
    }

    setSelectedAutoCompleteItemIdx(-1);
  };

  // 검색 실행
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input.toLowerCase());

    setIsAutoCompleteVisible(false);
    setSelectedAutoCompleteItemIdx(-1);
  };

  // 검색 초기화
  const resetSearch = () => {
    setInput("");
    setIsAutoCompleteVisible(false);
    setSelectedAutoCompleteItemIdx(-1);
  };

  // 마우스로 자동완성 단어 선택
  const selectAutoCompleteItemByMouse = (idx) => {
    setSelectedAutoCompleteItemIdx(idx);
  };

  // 키보드로 자동완성 단어 선택
  const selectAutoCompleteItemByKeyboard = (e) => {
    if (!isAutoCompleteVisible) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      const newIdx =
        selectedAutoCompleteItemIdx === autocompleteList.length - 1
          ? 0
          : selectedAutoCompleteItemIdx + 1;

      setSelectedAutoCompleteItemIdx(newIdx);
      setInput(autocompleteList[newIdx].names[language]);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (autocompleteList.length === 1) {
        setIsAutoCompleteVisible(false);
        return;
      }

      const newIdx =
        selectedAutoCompleteItemIdx === 0
          ? autocompleteList.length - 1
          : selectedAutoCompleteItemIdx - 1;

      setSelectedAutoCompleteItemIdx(newIdx);
      setInput(autocompleteList[newIdx].names[language]);
    }
  };

  // 자동완성 단어 클릭 시 검색 실행
  const searchByAutoCompleteItemClick = (pokemon) => {
    const name = pokemon.names[language];
    setInput(name);
    setQuery(name);
    setIsAutoCompleteVisible(false);
    setSelectedAutoCompleteItemIdx(-1);
  };

  // 검색창 바깥 영역 클릭 시 자동완성 닫기
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideSearchBarClick = (e) => {
      if (!ref.current) return;

      if (!ref.current.contains(e.target)) {
        setIsAutoCompleteVisible(false);
        setSelectedAutoCompleteItemIdx(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideSearchBarClick);

    return () =>
      document.removeEventListener("mousedown", handleOutsideSearchBarClick);
  }, []);

  // 언어 설정
  const { t } = useTranslation();

  return (
    <Wrapper ref={ref}>
      <SearchForm onSubmit={handleSubmit}>
        <IconButton fontSize="18px" icon={faMagnifyingGlass} tabIndex={-1} />
        <SearchInput
          type="text"
          placeholder={t("searchPlaceholder")}
          value={input}
          onChange={handleInputChange}
          onKeyDown={selectAutoCompleteItemByKeyboard}
          onClick={() => handleAutoComplete(input)}
        ></SearchInput>
        <IconButton
          fontSize="18px"
          icon={faXmark}
          onClick={resetSearch}
          hide={input === ""}
        />
      </SearchForm>
      {isAutoCompleteVisible && (
        <SearchAutoComplete>
          {autocompleteList.map((pokemon, idx) => (
            <SearchAutoCompleteItem
              key={pokemon.id}
              selected={idx === selectedAutoCompleteItemIdx}
              imgPath={pokemon.sprites.front_default}
              name={pokemon.names[language]}
              matchedName={matchedName}
              onClick={() => searchByAutoCompleteItemClick(pokemon)}
              onMouseEnter={() => selectAutoCompleteItemByMouse(idx)}
            />
          ))}
        </SearchAutoComplete>
      )}
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 10px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  padding: 9px 18px;
  border-radius: 10px;
  background-color: var(--input-bg-color);

  &:focus-within {
    outline: auto;
  }

  @media (max-width: 480px) {
    padding: 9px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 5px;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--fs-md);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SearchAutoComplete = styled.ul`
  position: absolute;
  top: 65px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  outline: 2px solid var(--autocomplete-border-color);
  background-color: var(--inner-bg-color);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 9999;
`;
