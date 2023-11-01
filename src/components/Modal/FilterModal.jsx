import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import { typeFiltersState } from "../../recoil";
import { POKEMON_TYPES } from "../../constants";
import ModalHeader from "./ModalHeader";
import FilterOption from "../common/Filter/FilterOption";

function FilterModal() {
  const { closeModal } = useModal();

  const [filters, setFilters] = useRecoilState(typeFiltersState);
  const [selectedFilters, setSelectedFilters] = useState(filters);

  const handleFilterOption = (selectedOption) => {
    if (selectedFilters.includes(selectedOption)) {
      setSelectedFilters((prev) =>
        prev.filter((option) => option !== selectedOption)
      );
    } else {
      setSelectedFilters((prev) => [...prev, selectedOption]);
    }
  };

  const resetFilters = () => {
    setSelectedFilters([]);
  };

  const applyFilters = () => {
    setFilters(selectedFilters);
    closeModal();
  };

  return (
    <Wrapper>
      <ModalHeader title="필터" />
      <FilterOptions>
        {POKEMON_TYPES.map((type) => (
          <FilterOption
            key={type}
            type={type}
            selected={selectedFilters.includes(type)}
            onClick={() => handleFilterOption(type)}
          />
        ))}
      </FilterOptions>
      <Buttons>
        <ResetButton onClick={resetFilters}>초기화</ResetButton>
        <ApplyButton onClick={applyFilters}>적용</ApplyButton>
      </Buttons>
    </Wrapper>
  );
}

export default FilterModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

export const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  background-color: var(--option-bg-color);
  font-size: var(--fs-md);
  color: var(--option-color);
`;

const ResetButton = styled(Button)``;

const ApplyButton = styled(Button)`
  background-color: var(--selected-option-bg-color);
  color: var(--selected-option-color);
  box-shadow: 0px 10px 20px rgba(234, 93, 96, 0.3);
`;
