import styled, { css } from "styled-components";

function Icon({ size, icon, hide, onClick }) {
  return (
    <Wrapper size={size} hide={hide} onClick={onClick}>
      <i className={"fa-solid" + " " + icon}></i>
    </Wrapper>
  );
}

export default Icon;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;

  ${(props) =>
    props.size === "lg" &&
    css`
      width: 40px;
      height: 40px;
      i {
        font-size: 20px;
      }
    `}

  ${(props) =>
    props.size === "md" &&
    css`
      width: 36px;
      height: 36px;
      i {
        font-size: 18px;
      }
    `}

    ${(props) =>
    props.size === "sm" &&
    css`
      width: 24px;
      height: 24px;
      i {
        font-size: 12px;
      }
    `}

    ${(props) =>
    props.hide &&
    css`
      visibility: hidden;
    `}
`;
