import { useEffect, useState } from "react";
import styled from "styled-components";

function BaseStat({ statName, statNum, majorType }) {
  const [stat, setStat] = useState(0);

  useEffect(() => {
    setStat(Math.round((statNum / 255) * 100));
  }, [statNum]);

  return (
    <Wrapper>
      <dt>{statName}</dt>
      <dd>
        <span>{statNum}</span>
        <StatBar stat={stat} majorType={majorType} />
      </dd>
    </Wrapper>
  );
}

export default BaseStat;

const Wrapper = styled.dl`
  display: grid;
  grid-template-columns: 100px auto;
  line-height: 2;

  dt {
    font-weight: bold;
  }

  dd {
    display: flex;
    align-items: center;

    span {
      width: 40px;
      text-align: end;
      color: gray;
    }
  }
`;

const StatBar = styled.div`
  width: 100%;
  height: 10px;
  margin-left: 20px;
  display: flex;
  background-color: #ececec;
  border-radius: 5px;

  &::after {
    content: "";
    width: ${(props) => props.stat}%;
    background-color: ${(props) => props.theme.typeBgColors[props.majorType]};
    border-radius: 5px;
    transition: 0.5s ease-in-out;
    transition-delay: 0.3s;
  }
`;
