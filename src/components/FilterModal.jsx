import { useState } from "react";
import styled, { css } from "styled-components";

function FilterModal({ filters, setFilters, closeModal }) {
  const filterOptions = [
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

  const [selected, setSelected] = useState(filters);

  const handleFilter = (selectedOption) => {
    if (selected.includes(selectedOption)) {
      setSelected((prev) => prev.filter((option) => option !== selectedOption));
    } else {
      setSelected((prev) => [...prev, selectedOption]);
    }
  };

  const resetFilters = () => {
    setSelected([]);
  };

  const applyFilters = () => {
    setFilters(selected);
    closeModal();
  };

  return (
    <>
      <FilterOptionList>
        {filterOptions.map((option) => (
          <FilterOption
            key={option}
            filter={option}
            active={selected.includes(option)}
            onClick={() => handleFilter(option)}
          >
            <img
              src={process.env.PUBLIC_URL + `/assets/badges/${option}.png`}
              alt={option}
            />
            <span>{option}</span>
          </FilterOption>
        ))}
      </FilterOptionList>
      <Buttons>
        <ResetButton onClick={resetFilters}>초기화</ResetButton>
        <ApplyButton onClick={applyFilters}>적용</ApplyButton>
      </Buttons>
    </>
  );
}

export default FilterModal;

export const FilterOptionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
`;

export const FilterOption = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  column-gap: 7.5px;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.gray};
  background-color: ${(props) => props.theme.colors.secondary};
  cursor: pointer;

  img {
    filter: ${(props) =>
      "opacity(0.5) drop-shadow(0 0 0 " + props.theme.colors.gray + ")"};
  }

  span::first-letter {
    text-transform: uppercase;
  }

  ${(props) =>
    props.active &&
    css`
      color: ${(props) => props.theme.colors.white};
      background-color: ${(props) => props.theme.typeColors[props.filter]};

      img {
        filter: brightness(0) invert(1);
      }
    `}
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.gray};
  font-family: inherit;
  cursor: pointer;
`;

const ResetButton = styled(Button)``;

const ApplyButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 10px 20px rgba(234, 93, 96, 0.3);
`;
