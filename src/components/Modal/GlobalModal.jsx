import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { modalState } from "../../recoil";
import { MODAL_TYPES } from "../../constants";
import SortModal from "./SortModal";
import FilterModal from "./FilterModal";
import LanguageModal from "./LanguageModal";

const GlobalModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  if (!modal) {
    return null;
  }

  return createPortal(
    <>
      <ModalOverlay onClick={() => setModal(null)}></ModalOverlay>
      <ModalDialog>
        {modal === MODAL_TYPES.SORT && <SortModal />}
        {modal === MODAL_TYPES.FILTER && <FilterModal />}
        {modal === MODAL_TYPES.LANGUAGE && <LanguageModal />}
      </ModalDialog>
    </>,
    document.getElementById("portal")
  );
};

export default GlobalModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
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

const ModalDialog = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: var(--inner-bg-color);
  z-index: 9999;
  animation: ${slideIn};
  animation-duration: 0.3s;
`;
