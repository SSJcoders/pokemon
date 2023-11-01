import styled from "styled-components";
import OpenPokeballImg from "../../../assets/images/open_pokeball.png";

const NotFound = ({ text }) => {
  return (
    <Wrapper>
      <Image src={OpenPokeballImg} />
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  font-family: "HANAMDAUM";
  font-size: var(--fs-md);
  text-align: center;
`;

const Image = styled.img`
  display: block;
`;

const Text = styled.div``;
