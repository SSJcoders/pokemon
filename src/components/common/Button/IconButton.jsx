import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";

function IconButton({ icon, fontSize, color, hide, onClick, title, tabIndex }) {
  return (
    <Wrapper
      type="button"
      fontSize={fontSize}
      hide={hide}
      onClick={onClick}
      title={title}
      tabIndex={tabIndex}
    >
      <FontAwesomeIcon icon={icon} fontSize={fontSize} color={color} />
    </Wrapper>
  );
}

export default IconButton;

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  ${({ fontSize }) =>
    fontSize === "20px" &&
    css`
      width: 40px;
      height: 40px;
    `}

  ${({ fontSize }) =>
    fontSize === "18px" &&
    css`
      width: 36px;
      height: 36px;
    `}


    ${({ hide }) =>
    hide &&
    css`
      visibility: hidden;
    `}


    ${({ tabIndex }) =>
    tabIndex === -1 &&
    css`
      cursor: default;
    `};
`;
