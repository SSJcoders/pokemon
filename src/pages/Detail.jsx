import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Icon from "../components/Icon";
import About from "../components/About";
import Stats from "../components/Stats";
import Evolution from "../components/Evolution";
import TabLogo from "../assets/tabLogo.png";

function Detail({ pokemon }) {
  const { id, names, types, sprites } = pokemon;
  const majorType = pokemon.types[0].type.name;

  const [tabNum, setTabNum] = useState(0);

  const navigate = useNavigate();

  return (
    <Wrapper majorType={majorType}>
      <Nav>
        <Icon icon="fa-chevron-left" size="lg" onClick={() => navigate(-1)} />
      </Nav>
      <Pokemon>
        <Image src={sprites.other["official-artwork"].front_default} />
        <Info>
          <Number>{"#" + String(id).padStart(4, "0")}</Number>
          <Name>{names["kr"]}</Name>
          <Types>
            {types.map(({ type }) => (
              <Type key={type.name} type={type.name}>
                <img
                  src={
                    process.env.PUBLIC_URL + `/assets/badges/${type.name}.png`
                  }
                  alt={type.name}
                />
                <span>{type.name}</span>
              </Type>
            ))}
          </Types>
        </Info>
      </Pokemon>
      <Tabs>
        <Tab onClick={() => setTabNum(0)} active={tabNum === 0}>
          개요
        </Tab>
        <Tab onClick={() => setTabNum(1)} active={tabNum === 1}>
          능력치
        </Tab>
        <Tab onClick={() => setTabNum(2)} active={tabNum === 2}>
          진화
        </Tab>
      </Tabs>
      <Main>
        {tabNum === 0 ? <About /> : null}
        {tabNum === 1 ? <Stats /> : null}
        {tabNum === 2 ? <Evolution /> : null}
      </Main>
    </Wrapper>
  );
}

export default Detail;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.typeBgColors[props.majorType]};
`;

const Nav = styled.nav`
  padding: 20px;
`;

const Pokemon = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 35px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 130px;
  height: 130px;
  margin-right: 20px;

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 320px) {
    width: 90px;
    height: 90px;
  }
`;

const Number = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.number};
  margin-bottom: 5px;
`;

const Name = styled.span`
  &::first-letter {
    text-transform: uppercase;
  }
  font-family: "HANAMDAUM";
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;

  @media (max-width: 320px) {
    font-size: 20px;
  }
`;

const Types = styled.div`
  display: flex;
  column-gap: 5px;
`;

const Type = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
  color: white;
  background-color: ${(props) => props.theme.typeColors[props.type]};

  span::first-letter {
    text-transform: uppercase;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const Tab = styled.div`
  flex: 1;
  padding: 15px 0;
  text-align: center;
  cursor: pointer;
  background: ${(props) =>
    props.active && `url(${TabLogo}) no-repeat center top`};
  color: ${(props) => props.theme.colors.white};
`;

const Main = styled.main`
  flex: 1;
  padding: 40px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${(props) => props.theme.colors.white};
`;
