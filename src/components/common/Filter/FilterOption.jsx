import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FilterOption = ({ type, selected, onClick, hasRemoveIcon }) => {
  const { t } = useTranslation();

  return (
    <Wrapper type={type} selected={selected} onClick={onClick}>
      <TypeLogo
        src={process.env.PUBLIC_URL + `/assets/badges/${type}.png`}
        alt={type}
        selected={selected}
      />
      <TypeText>{t(`pokemonTypes.${type}`)}</TypeText>
      {hasRemoveIcon && <FontAwesomeIcon icon={faXmark} fontSize="12px" />}
    </Wrapper>
  );
};

export default FilterOption;

const Wrapper = styled.button`
  width: fit-content;
  display: flex;
  align-items: center;
  column-gap: 7.5px;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--option-bg-color);
  font-size: var(--fs-md);
  color: var(--option-color);

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme, type }) => theme.typeColors[type]};
      color: var(--selected-option-color);
    `}
`;

const TypeLogo = styled.img`
  filter: ${({ selected }) =>
    selected
      ? "brightness(0) invert(1)"
      : "opacity(0.5) drop-shadow(0 0 0 var(--option-color))"};
`;

const TypeText = styled.span`
  &::first-letter {
    text-transform: uppercase;
  }
`;
