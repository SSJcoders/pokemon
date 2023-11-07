import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import useModal from "../../hooks/useModal";
import { sortState } from "../../recoil";
import { SORT_OPTIONS } from "../../constants";
import ModalHeader from "./ModalHeader";
import ElevatedButton from "../common/Button/ElevatedButton";

function SortModal() {
  const { closeModal } = useModal();

  const [sort, setSort] = useRecoilState(sortState);

  const handleSortOption = (option) => {
    setSort(option);
    closeModal();
  };

  const { t } = useTranslation();

  return (
    <Wrapper>
      <ModalHeader title={t("sort")} />
      <SortOptions>
        {Object.values(SORT_OPTIONS).map((option) => {
          return (
            <SortOption
              type="button"
              key={option}
              selected={sort === option}
              onClick={() => handleSortOption(option)}
            >
              {t(`sortOptions.${option}`)}
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
  ${ElevatedButton}
`;
