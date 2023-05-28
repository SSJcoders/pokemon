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
    <div>
      <Title>정렬</Title>
      {Object.keys(sortOptions).map((option) => (
        <SortOption
          key={option}
          active={sort === option}
          onClick={() => handleSort(option)}
        >
          {sortOptions[option]}
        </SortOption>
      ))}
    </div>
  );
}

export default SortModal;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const SortOption = styled.button`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
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
`;
