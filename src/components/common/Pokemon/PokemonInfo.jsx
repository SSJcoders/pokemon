import styled from "styled-components";

const PokemonInfo = ({ id, names, types }) => {
  return (
    <Wrapper>
      <PokemonId>{"#" + String(id).padStart(4, "0")}</PokemonId>
      <PokemonName>{names["ko"]}</PokemonName>
      <PokemonTypes>
        {types.map(({ type }) => (
          <PokemonType key={type.name} type={type.name}>
            <PokemonTypeLogo
              src={process.env.PUBLIC_URL + `/assets/badges/${type.name}.png`}
              alt={type.name}
            />
            <PokemonTypeName>{type.name}</PokemonTypeName>
          </PokemonType>
        ))}
      </PokemonTypes>
    </Wrapper>
  );
};

export default PokemonInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const PokemonId = styled.span`
  font-size: var(--fs-xs);
  font-weight: bold;
  color: var(--pokemon-id-color);
`;

const PokemonName = styled.span`
  font-family: "HANAMDAUM";
  font-size: var(--fs-2xl);
  font-weight: bold;
  color: var(--pokemon-name-color);

  &::first-letter {
    text-transform: uppercase;
  }

  @media (max-width: 320px) {
    font-size: var(--fs-xl);
  }
`;

const PokemonTypes = styled.ul`
  display: flex;
  column-gap: 5px;
`;

const PokemonType = styled.li`
  display: flex;
  align-items: center;
  column-gap: 5px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${({ theme, type }) => theme.typeColors[type]};
`;

const PokemonTypeLogo = styled.img``;

const PokemonTypeName = styled.span`
  font-size: var(--fs-xs);
  color: var(--pokemon-type-color);

  &::first-letter {
    text-transform: uppercase;
  }
`;
