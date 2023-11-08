import { selector, selectorFamily, atom } from "recoil";
import {
  LOCALSTORAGE_KEY_LANG,
  LOCALSTORAGE_KEY_MY_POKEMONS,
  pokemonIdList,
  SORT_OPTIONS,
} from "./constants";

export const modalState = atom({
  key: "modal",
  default: null,
});

export const languageState = atom({
  key: "language",
  default: localStorage.getItem(LOCALSTORAGE_KEY_LANG) || "ko",
});

export const queryState = atom({
  key: "query",
  default: "",
});

export const typeFiltersState = atom({
  key: "typeFilters",
  default: [],
});

export const sortState = atom({
  key: "sort",
  default: SORT_OPTIONS.ID_ASC,
});

export const myPokemonsListState = atom({
  key: "myPokemonsList",
  default: JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_MY_POKEMONS)) || [],
});

export const myPokemonsFilteredState = atom({
  key: "myPokemonsFiltered",
  default: false,
});

export const pokemonNamesState = selector({
  key: "pokemonNames",
  get: () => {
    return Promise.all(
      pokemonIdList.map((pokemonId) =>
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
          .then((res) => res.json())
          .then((data) => ({
            ko: data.names[2].name,
            en: data.name,
          }))
      )
    );
  },
});

export const pokemonListState = selector({
  key: "pokemonList",
  get: ({ get }) => {
    const pokemonNames = get(pokemonNamesState);

    return Promise.all(
      pokemonIdList.map((pokemonId) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
          .then((res) => res.json())
          .then((data) => ({
            ...data,
            names: pokemonNames[pokemonId - 1],
          }))
      )
    );
  },
});

export const pokemonByIdState = selectorFamily({
  key: "pokemonById",
  get:
    (pokemonId) =>
    ({ get }) => {
      const pokemonList = get(pokemonListState);

      return pokemonList.find((pokemon) => pokemon.id === +pokemonId);
    },
});

export const processedPokemonListState = selector({
  key: "processedPokemonList",
  get: ({ get }) => {
    const pokemonList = get(pokemonListState);

    const query = get(queryState);
    const typeFilters = get(typeFiltersState);
    const sort = get(sortState);
    const language = get(languageState);

    return (
      pokemonList
        // 검색 (포켓몬 이름, id)
        .filter(({ names, id }) => {
          return names[language].includes(query) || id === +query;
        })
        // 필터링 (포켓몬 타입)
        .filter(({ types }) => {
          const myTypes = types.map((type) => type.type.name);
          if (typeFilters.length > 0) {
            return typeFilters.some((typeFilter) =>
              myTypes.includes(typeFilter)
            );
          } else {
            return true;
          }
        })
        // 정렬 (id 오름차순/내림차순, 이름 오름차순/내림차순)
        .sort((a, b) => {
          switch (sort) {
            case SORT_OPTIONS.ID_ASC:
              return a.id - b.id;
            case SORT_OPTIONS.ID_DESC:
              return b.id - a.id;
            case SORT_OPTIONS.NAME_ASC:
              return b.names[language] > a.names[language]
                ? -1
                : b.names[language] < a.names[language]
                ? 1
                : 0;
            case SORT_OPTIONS.NAME_DESC:
              return a.names[language] > b.names[language]
                ? -1
                : a.names[language] < b.names[language]
                ? 1
                : 0;
            default:
              return a.id - b.id;
          }
        })
    );
  },
});
