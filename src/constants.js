export const LOCALSTORAGE_KEY = "pokemon";
export const LOCALSTORAGE_KEY_LANG = "pokemon_lang";
export const LOCALSTORAGE_KEY_MY_POKEMONS = "pokemon_myPokemons";

export const NUM_OF_POKEMONS = 151;

export const pokemonIdList = Array.from(
  { length: NUM_OF_POKEMONS },
  (_, i) => i + 1
);

export const MAX_VALUE_OF_STAT = 255;

export const POKEMON_TYPES = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

export const MODAL_TYPES = {
  SORT: "SORT",
  FILTER: "FILTER",
  LANGUAGE: "LANGUAGE",
};

export const SORT_OPTIONS = {
  ID_ASC: "idASC",
  ID_DESC: "idDESC",
  NAME_ASC: "nameASC",
  NAME_DESC: "nameDESC",
};
