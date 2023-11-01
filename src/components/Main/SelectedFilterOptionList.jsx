import { useRecoilState } from "recoil";
import styled from "styled-components";
import { typeFiltersState } from "../../recoil";
import FilterOption from "../common/Filter/FilterOption";

const SelectedFilterOptions = () => {
  const [filters, setFilters] = useRecoilState(typeFiltersState);

  const removeSelectedFilter = (selectedFilter) => {
    setFilters((prev) => prev.filter((option) => option !== selectedFilter));
  };

  return (
    <Wrapper>
      {filters.map((option) => (
        <FilterOption
          key={option}
          type={option}
          onClick={() => removeSelectedFilter(option)}
          selected
          hasRemoveIcon
        />
      ))}
    </Wrapper>
  );
};

export default SelectedFilterOptions;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
