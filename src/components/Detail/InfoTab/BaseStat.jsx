import { useEffect, useState } from "react";
import styled from "styled-components";
import { MAX_VALUE_OF_STAT } from "../../../constants";

function BaseStat({ statName, statValue, majorType }) {
  const [stat, setStat] = useState(0);

  useEffect(() => {
    setStat(Math.round((statValue / MAX_VALUE_OF_STAT) * 100));
  }, [statValue]);

  return (
    <Wrapper>
      <Dt>{statName}</Dt>
      <Dd>
        <StatValue>{statValue}</StatValue>
        <StatBar stat={stat} majorType={majorType} />
      </Dd>
    </Wrapper>
  );
}

export default BaseStat;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  line-height: 2;
`;

const Dt = styled.dt`
  font-weight: bold;
`;

const Dd = styled.dd`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;

const StatValue = styled.span`
  width: 40px;
  text-align: end;
  color: var(--pokemon-value-color);
`;

const StatBar = styled.div`
  flex: 1;
  height: 10px;
  display: flex;
  border-radius: 5px;
  background-color: var(--pokemon-stat-bar-color);

  &::after {
    content: "";
    width: ${({ stat }) => stat}%;
    border-radius: 5px;
    background-color: ${({ theme, majorType }) =>
      theme.typeBgColors[majorType]};
    transition: 0.5s ease-in-out;
    transition-delay: 0.3s;
  }
`;
