import styled from "styled-components";
import { faX } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../common/Button/IconButton";
import useModal from "../../hooks/useModal";

const ModalHeader = ({ title }) => {
  const { closeModal } = useModal();

  return (
    <Wrapper>
      <Title>{title}</Title>
      <IconButton icon={faX} fontSize="20px" onClick={closeModal} />
    </Wrapper>
  );
};

export default ModalHeader;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: var(--fs-2xl);
  font-weight: bold;
`;
