import styled from "styled-components";
import BaseInfo from "./BaseInfo";
import BaseStat from "./BaseStat";

function InfoTab({ pokemon, majorType }) {
  const infoList = [
    {
      name: {
        ko: "신장",
        en: "Height",
      },
      value: pokemon.height / 10 + "m",
    },
    {
      name: {
        ko: "몸무게",
        en: "Weight",
      },
      value: pokemon.weight / 10 + "kg",
    },
    {
      name: {
        ko: "주 능력",
        en: "Major Ability",
      },
      value: pokemon.abilities[0].ability.name,
    },
    {
      name: {
        ko: "기본 경험치",
        en: "Base Experience",
      },
      value: pokemon.base_experience,
    },
  ];

  const statList = [
    {
      name: {
        ko: "체력",
        en: "HP",
      },
      value: pokemon.stats[0].base_stat,
    },
    {
      name: {
        ko: "공격",
        en: "Attack",
      },
      value: pokemon.stats[1].base_stat,
    },
    {
      name: {
        ko: "방어",
        en: "Defense",
      },
      value: pokemon.stats[2].base_stat,
    },
    {
      name: {
        ko: "특수공격",
        en: "Sp.Atk",
      },
      value: pokemon.stats[3].base_stat,
    },
    {
      name: {
        ko: "특수방어",
        en: "Sp.Def",
      },
      value: pokemon.stats[4].base_stat,
    },
    {
      name: {
        ko: "스피드",
        en: "Speed",
      },
      value: pokemon.stats[5].base_stat,
    },
  ];

  return (
    <Wrapper>
      <Article>
        <Title majorType={majorType}>기본 정보</Title>
        <Contents>
          {infoList.map((info) => (
            <BaseInfo
              key={info.name["ko"]}
              infoName={info.name["ko"]}
              infoValue={info.value}
            />
          ))}
        </Contents>
      </Article>
      <Article>
        <Title majorType={majorType}>기본 능력치</Title>
        <Contents>
          {statList.map((stat) => (
            <BaseStat
              key={stat.name["ko"]}
              statName={stat.name["ko"]}
              statValue={stat.value}
              majorType={majorType}
            />
          ))}
        </Contents>
      </Article>
    </Wrapper>
  );
}

export default InfoTab;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const Title = styled.div`
  font-family: "HANAMDAUM";
  font-size: var(--fs-xl);
  font-weight: bold;
  line-height: 2;
  color: ${({ theme, majorType }) => theme.typeBgColors[majorType]};
`;

const Contents = styled.dl``;
