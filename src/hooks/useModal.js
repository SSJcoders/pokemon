import { useSetRecoilState } from "recoil";
import { modalState } from "../recoil";

const useModal = () => {
  const setModal = useSetRecoilState(modalState);

  const openModal = (modalType) => setModal(modalType);

  const closeModal = () => setModal(null);

  return { openModal, closeModal };
};

export default useModal;
