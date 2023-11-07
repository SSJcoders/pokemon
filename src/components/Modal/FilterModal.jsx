import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import useModal from "../../hooks/useModal";
import { typeFiltersState } from "../../recoil";
import { POKEMON_TYPES } from "../../constants";
import ModalHeader from "./ModalHeader";
import FilterOption from "../common/Filter/FilterOption";
import ElevatedButton from "../common/Button/ElevatedButton";

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

  const { t } = useTranslation();

  return (
    <Wrapper>
      <ModalHeader title={t("filter")} />
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
        <ResetButton type="button" onClick={resetFilters}>
          {t("filterLabels.reset")}
        </ResetButton>
        <ApplyButton type="button" onClick={applyFilters}>
          {t("filterLabels.apply")}
        </ApplyButton>
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

const ResetButton = styled.button`
  ${ElevatedButton}
`;

const ApplyButton = styled.button`
  ${ElevatedButton}
  background-color: var(--selected-option-bg-color);
  color: var(--selected-option-color);
  box-shadow: 0px 10px 20px rgba(234, 93, 96, 0.3);
`;
