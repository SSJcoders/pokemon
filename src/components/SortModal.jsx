import styled, { css } from "styled-components";

function SortModal({ sort, setSort, closeModal }) {
  const sortOptions = {
    num_asc: "번호 오름차순",
    num_desc: "번호 내림차순",
    name_asc: "A-Z",
    name_desc: "Z-A",
  };

  const handleSort = (option) => {
    setSort(option);
    closeModal();
  };

  return (
    <>
      {Object.keys(sortOptions).map((option) => (
        <SortOption
          key={option}
          active={sort === option}
          onClick={() => handleSort(option)}
        >
          {sortOptions[option]}
        </SortOption>
      ))}
    </>
  );
}

export default SortModal;

const SortOption = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.gray};
  font-family: inherit;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.white};
      box-shadow: 0px 10px 20px rgba(234, 93, 96, 0.3);
    `}

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
