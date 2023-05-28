import styled, { keyframes } from "styled-components";
import SortModal from "./SortModal";
import FilterModal from "./FilterModal";

export default function Modal({ kind, closeModal, option, setOption }) {
  if (kind === "") return null;

  return (
    <>
      <ModalOverlay onClick={closeModal}></ModalOverlay>
      <ModalContents>
        {kind === "sort" ? (
          <SortModal
            sort={option}
            setSort={setOption}
            closeModal={closeModal}
          />
        ) : null}
        {kind === "filter" ? (
          <FilterModal
            filters={option}
            setFilters={setOption}
            closeModal={closeModal}
          />
        ) : null}
      </ModalContents>
    </>
  );
}

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const slideIn = keyframes`
    from {
        opacity: 0;
        transform:  translateY(100%);
    }
    to {
        opacity: 1;
        transform:  translateY(0%);
    }
`;

const ModalContents = styled.div`
  position: fixed;
  width: 100%;
  max-width: 480px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  z-index: 1;
  padding: 50px;
  animation: ${slideIn};
  animation-duration: 0.3s;
`;