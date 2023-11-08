import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { languageState } from "../../../recoil";
import PokemonInfo from "./PokemonInfo";
import PokemonImage from "./PokemonImage";
import PatternImg from "../../../assets/images/pattern.png";
import PokeballSmImg from "../../../assets/images/pokeball_sm.png";

function PokemonItem({ pokemon }, ref) {
  const { id, names, types, sprites } = pokemon;
  const majorType = pokemon.types[0].type.name;

  const language = useRecoilValue(languageState);

  return (
    <Wrapper majorType={majorType} ref={ref}>
      <SLink to={`/${id}`} state={{ pokemon: pokemon }}>
        <PokemonInfo id={id} names={names} types={types} />
        <PokemonImage
          imgPath={sprites.other["official-artwork"].front_default}
          isAbsolute={true}
          alt={names[language]}
        />
      </SLink>
    </Wrapper>
  );
}

export default React.forwardRef(PokemonItem);

const Wrapper = styled.li`
  border-radius: 10px;
  background-color: ${({ theme, majorType }) => theme.typeBgColors[majorType]};
  background-image: url(${PatternImg}), url(${PokeballSmImg});
  background-repeat: no-repeat;
  background-position: 40% 5px, right 0px;
`;

const SLink = styled(Link)`
  position: relative;
  display: block;
  padding: 20px;
`;
