import styled, { keyframes } from "styled-components";
import Pokeball from "../assets/pokeball-sm.png";
import Pattern from "../assets/pattern.png";

function PokemonItem({ pokemon }) {
  const { id, names, types, sprites } = pokemon;
  const majorType = pokemon.types[0].type.name;

  return (
    <Wrapper majorType={majorType}>
      <Number>{"#" + String(id).padStart(4, "0")}</Number>
      <Name>{names["kr"]}</Name>
      <Types>
        {types.map(({ type }) => (
          <Type key={type.name} type={type.name}>
            <img
              src={process.env.PUBLIC_URL + `/assets/badges/${type.name}.png`}
              alt={type.name}
            />
            <span>{type.name}</span>
          </Type>
        ))}
      </Types>
      <Image src={sprites.other["official-artwork"].front_default} />
    </Wrapper>
  );
}

export default PokemonItem;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.typeBgColors[props.majorType]};
  background-image: url(${Pattern}), url(${Pokeball});
  background-repeat: no-repeat;
  background-position: 40% 5px, right 0px;
  position: relative;

  &:first-child {
    margin-top: 20px;
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;

const Number = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.number};
  margin-bottom: 5px;
`;

const Name = styled.span`
  &::first-letter {
    text-transform: uppercase;
  }
  font-family: "HANAMDAUM";
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;

  @media (max-width: 320px) {
    font-size: 20px;
  }
`;

const Types = styled.div`
  display: flex;
  column-gap: 5px;
`;

const Type = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
  color: white;
  background-color: ${(props) => props.theme.typeColors[props.type]};

  span::first-letter {
    text-transform: uppercase;
  }
`;

const dance = keyframes`
  0%, 100% {
    transform: rotate(0)
  }
  25% {
    transform: rotate(-10deg)
  }
  75% {
    transform: rotate(10deg)
  }
`;

const Image = styled.img`
  width: 130px;
  height: 130px;
  position: absolute;
  bottom: 10px;
  right: 20px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      animation: ${dance} 1s linear infinite 100ms;
    }
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    right: 10px;
  }

  @media (max-width: 320px) {
    width: 90px;
    height: 90px;
    bottom: 15px;
    right: 5px;
  }
`;
