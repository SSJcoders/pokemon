import styled, { keyframes, css } from "styled-components";

const PokemonImage = ({ imgPath, isAbsolute }) => {
  return <Wrapper src={imgPath} isAbsolute={isAbsolute} />;
};

export default PokemonImage;

const dance = keyframes`
  0%, 100% {
    transform: rotate(0)
  }
  25% {
    transform: rotate(-10deg)
  }
  75% {
    transform: rotate(10deg)
  }
`;

const Wrapper = styled.img`
  width: 130px;
  height: 130px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      animation: ${dance} 1s linear infinite 100ms;
    }
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 320px) {
    width: 90px;
    height: 90px;
  }

  ${({ isAbsolute }) =>
    isAbsolute &&
    css`
      position: absolute;
      bottom: 10px;
      right: 20px;

      @media (max-width: 480px) {
        right: 10px;
      }

      @media (max-width: 320px) {
        right: 5px;
        bottom: 15px;
      }
    `};
`;
