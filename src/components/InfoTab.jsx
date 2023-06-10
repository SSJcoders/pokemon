import styled from "styled-components";
import BaseStat from "./BaseStat";

function InfoTab({ majorType, pokemon }) {
  const statList = [
    {
      name: {
        kr: "체력",
        en: "HP",
      },
      num: pokemon.stats[0].base_stat,
    },
    {
      name: {
        kr: "공격",
        en: "Attack",
      },
      num: pokemon.stats[1].base_stat,
    },
    {
      name: {
        kr: "방어",
        en: "Defense",
      },
      num: pokemon.stats[2].base_stat,
    },
    {
      name: {
        kr: "특수공격",
        en: "Sp.Atk",
      },
      num: pokemon.stats[3].base_stat,
    },
    {
      name: {
        kr: "특수방어",
        en: "Sp.Def",
      },
      num: pokemon.stats[4].base_stat,
    },
    {
      name: {
        kr: "스피드",
        en: "Speed",
      },
      num: pokemon.stats[5].base_stat,
    },
  ];

  return (
    <Wrapper majorType={majorType}>
      <Label>기본 정보</Label>
      <Contents>
        <dl>
          <dt>신장</dt>
          <dd>{pokemon.height / 10}m</dd>
        </dl>
        <dl>
          <dt>몸무게</dt>
          <dd>{pokemon.weight / 10}kg</dd>
        </dl>
        <dl>
          <dt>주 능력</dt>
          <dd className="ability">{pokemon.abilities[0].ability.name}</dd>
        </dl>
        <dl>
          <dt>기본 경험치</dt>
          <dd>{pokemon.base_experience}</dd>
        </dl>
      </Contents>
      <Label>기본 능력치</Label>
      <Contents>
        {statList.map((stat) => (
          <BaseStat
            key={stat.name["kr"]}
            statName={stat.name["kr"]}
            statNum={stat.num}
            majorType={majorType}
          />
        ))}
      </Contents>
    </Wrapper>
  );
}

export default InfoTab;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: ${(props) => props.theme.typeBgColors[props.majorType]};
  }
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Contents = styled.div`
  margin-bottom: 30px;

  dl {
    display: grid;
    grid-template-columns: 100px auto;
    line-height: 2;

    dt {
      font-weight: bold;
    }

    dd {
      color: gray;
    }

    .ability::first-letter {
      text-transform: uppercase;
    }
  }
`;
