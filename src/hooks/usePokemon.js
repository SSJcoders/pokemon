import { useState, useEffect } from "react";

function usePokemon() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const NUM_OF_POKEMONS = 151;

    let langRequests = [];
    let pokemonRequests = [];

    let koreanNames = [];
    let englishNames = [];

    let pokemons = [];

    for (let i = 0; i < NUM_OF_POKEMONS; i++) {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
      const langUrl = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`;

      pokemonRequests.push(fetch(pokemonUrl));
      langRequests.push(fetch(langUrl));
    }

    Promise.all(langRequests)
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((results) => {
        for (let result of results) {
          koreanNames.push(result.names[2].name);
          englishNames.push(result.name);
        }

        Promise.all(pokemonRequests)
          .then((responses) => Promise.all(responses.map((res) => res.json())))
          .then((results) => {
            results.forEach((result, idx) =>
              pokemons.push({
                ...result,
                names: { kr: koreanNames[idx], en: englishNames[idx] },
              })
            );

            setPokemonList(pokemons);
          });
      });

    return () => setPokemonList([]);
  }, []);

  return pokemonList;
}

export default usePokemon;
