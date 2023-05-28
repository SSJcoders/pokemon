import styled from "styled-components";
import LoaderImg from "../assets/loader.gif";

function Loader() {
  return (
    <Wrapper>
      <img src={LoaderImg} alt="로딩중" />
      <p>로딩중</p>
    </Wrapper>
  );
}

export default Loader;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 40px;
  overflow: hidden;

  img {
    transform: scale(2);
  }

  p {
    font-family: "HANAMDAUM";
    font-size: 20px;
  }
`;
