import { useState, useEffect } from "react";
import axios from "axios";

function usePokemon() {
  const [pokemonList, setPokemonList] = useState([]);

  const fetchPokemonList = (results) => {
    results.forEach((el) => {
      axios({
        url: el.url,
        method: "GET",
      }).then((res) => setPokemonList((prev) => [...prev, res.data]));
    });
  };

  useEffect(() => {
    setPokemonList([]);
    axios({
      url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151",
      method: "GET",
    }).then((res) => fetchPokemonList(res.data.results));
  }, []);

  return pokemonList;
}

export default usePokemon;
