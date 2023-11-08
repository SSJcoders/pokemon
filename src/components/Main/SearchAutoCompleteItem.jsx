import styled from "styled-components";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../common/Button/IconButton";

const SearchAutoCompleteItem = ({
  selected,
  imgPath,
  name,
  matchedName,
  onClick,
  onMouseEnter,
}) => {
  const notMatchedName = name.substr(matchedName.length);

  return (
    <Wrapper selected={selected} onClick={onClick} onMouseEnter={onMouseEnter}>
      <PokemonImg src={imgPath} alt={name} />
      <PokemonName>
        <PokemonMatchedName>{matchedName.toLowerCase()}</PokemonMatchedName>
        <PokemonNotMatchedName>{notMatchedName}</PokemonNotMatchedName>
      </PokemonName>
      <IconButton fontSize="18px" icon={faChevronRight} color="gray" />
    </Wrapper>
  );
};

export default SearchAutoCompleteItem;

const Wrapper = styled.li`
  height: 40px;
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding-inline: 18px;
  background-color: ${({ selected }) =>
    selected && "var(--autocomplete-selected-color)"};
  cursor: pointer;
`;

const PokemonImg = styled.img`
  display: block;
  width: 36px;
  height: 36px;
  object-fit: cover;
`;

const PokemonName = styled.div`
  flex: 1;
  font-size: var(--fs-md);

  &::first-letter {
    text-transform: uppercase;
  }
`;

const PokemonMatchedName = styled.strong`
  color: var(--pokemon-matched-name-color);
`;

const PokemonNotMatchedName = styled.span``;
