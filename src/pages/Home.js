import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Pokemon from "../components/Pokemon";

function Home() {
  const INITIAL_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12";
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(INITIAL_URL);
  const [nextUrl, setNextUrl] = useState("");
  const [pokemonList, setPokemonList] = useState([]);

  const observer = useRef();
  const bottomRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextUrl) {
          setCurrentUrl(nextUrl);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, nextUrl]
  );

  const getPokemonList = async (results) => {
    results.map(async (item) => {
      const pokemon = await (await fetch(item.url)).json();
      setPokemonList((prevList) => {
        const newList = [...prevList, pokemon];
        return newList.sort((a, b) => (a.id > b.id ? 1 : -1));
      });
    });
    setLoading(false);
  };

  const getPokemonUrl = async () => {
    setLoading(true);
    const data = await (await fetch(currentUrl)).json();
    setNextUrl(data.next);
    getPokemonList(data.results);
  };

  useEffect(() => {
    getPokemonUrl();
  }, [currentUrl]);

  return (
    <Container>
      <Title>Get your pokemon!</Title>

      <PokemonContainer>
        {pokemonList.map((pokemon) => {
          return <Pokemon key={pokemon.id} pokemon={pokemon} />;
        })}
      </PokemonContainer>

      {loading && <Loading>Loading...</Loading>}

      <div ref={bottomRef}></div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 80px 0;
  text-align: center;
  font-size: 48px;
`;

const PokemonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 30px;
  row-gap: 50px;
  margin: 0 auto;

  @media (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Loading = styled.h1`
  margin: 50px 0;
  text-align: center;
  font-size: 32px;
`;
