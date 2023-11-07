import { useTranslation } from "react-i18next";
import styled from "styled-components";
import BasicInfo from "./BasicInfo";
import BaseStat from "./BaseStat";

function InfoTab({ pokemon, majorType }) {
  const { t } = useTranslation();

  const infoList = [
    {
      name: "height",
      value: pokemon.height / 10 + "m",
    },
    {
      name: "weight",
      value: pokemon.weight / 10 + "kg",
    },
    {
      name: "majorAbility",
      value: pokemon.abilities[0].ability.name,
    },
    {
      name: "baseExperience",
      value: pokemon.base_experience,
    },
  ];

  const statList = [
    {
      name: "hp",
      value: pokemon.stats[0].base_stat,
    },
    {
      name: "attack",
      value: pokemon.stats[1].base_stat,
    },
    {
      name: "defense",
      value: pokemon.stats[2].base_stat,
    },
    {
      name: "spAtk",
      value: pokemon.stats[3].base_stat,
    },
    {
      name: "spDef",
      value: pokemon.stats[4].base_stat,
    },
    {
      name: "speed",
      value: pokemon.stats[5].base_stat,
    },
  ];

  return (
    <Wrapper>
      <Article>
        <Title majorType={majorType}>{t("basicInfo")}</Title>
        <Contents>
          {infoList.map((info) => (
            <BasicInfo
              key={info.name}
              infoName={t(`basicInfoOptions.${info.name}`)}
              infoValue={info.value}
            />
          ))}
        </Contents>
      </Article>
      <Article>
        <Title majorType={majorType}>{t("baseStats")}</Title>
        <Contents>
          {statList.map((stat) => (
            <BaseStat
              key={stat.name}
              statName={t(`baseStatsOptions.${stat.name}`)}
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
