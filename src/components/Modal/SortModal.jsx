import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import useModal from "../../hooks/useModal";
import { sortState } from "../../recoil";
import { SORT_OPTIONS } from "../../constants";
import ModalHeader from "./ModalHeader";

function SortModal() {
  const { closeModal } = useModal();

  const [sort, setSort] = useRecoilState(sortState);

  const handleSortOption = (option) => {
    setSort(option);
    closeModal();
  };

  return (
    <Wrapper>
      <ModalHeader title="정렬" />
      <SortOptions>
        {Object.values(SORT_OPTIONS).map((option) => {
          return (
            <SortOption
              key={option}
              selected={sort === option}
              onClick={() => handleSortOption(option)}
            >
              {option}
            </SortOption>
          );
        })}
      </SortOptions>
    </Wrapper>
  );
}

export default SortModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const SortOptions = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const SortOption = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  background-color: var(--option-bg-color);
  font-size: var(--fs-md);
  color: var(--option-color);

  ${({ selected }) =>
    selected &&
    css`
      background-color: var(--selected-option-bg-color);
      color: var(--selected-option-color);
      box-shadow: 0px 10px 20px rgba(234, 93, 96, 0.3);
    `}
`;
