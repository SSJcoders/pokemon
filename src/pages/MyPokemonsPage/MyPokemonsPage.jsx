import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { myPokemonsFilteredState, myPokemonsListState } from "../../recoil";
import { pokemonIdList } from "../../constants";
import { getPokemonSvgImg } from "../../utils";
import IconButton from "../../components/common/Button/IconButton";
import MyPokemonsEmptyImg from "../../assets/images/open_pokeball.png";
import BouncePokeballImg from "../../assets/images/loader.gif";

const MyPokemonsPage = () => {
  // 포켓몬 데이터
  const myPokemonsList = useRecoilValue(myPokemonsListState);
  const isActive = (id) => myPokemonsList.includes(String(id));

  // 내 포켓몬만 보기 필터링
  const [filtered, setFiltered] = useRecoilState(myPokemonsFilteredState);
  const toggleFiltering = () => setFiltered((prev) => !prev);
  const filteredMyPokemonsList = filtered
    ? [...myPokemonsList].sort((a, b) => a - b)
    : pokemonIdList;

  // 페이지 이동
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const goToDetailPage = (id) => navigate(`/${id}`);

  // 언어 설정
  const { t } = useTranslation();

  return (
    <Wrapper>
      <NavBar>
        <IconButton icon={faChevronLeft} fontSize="20px" onClick={goBack} />
        <Title>{t("myPokemons")}</Title>
      </NavBar>
      <Column>
        <MyPokemonsCount
          dangerouslySetInnerHTML={{
            __html: t("myPokemonsCount", {
              count: myPokemonsList.length,
              v1: "<strong>",
              v2: "</strong>",
            }),
          }}
        />
        <MyPokemonsFiltering type="button" onClick={toggleFiltering}>
          {filtered ? t("myPokemonsAll") : t("myPokemonsFiltered")}
        </MyPokemonsFiltering>
        {filteredMyPokemonsList.length === 0 && (
          <MyPokemonsEmpty src={MyPokemonsEmptyImg}></MyPokemonsEmpty>
        )}
      </Column>

      <PokemonsGrid>
        {filteredMyPokemonsList.map((id) => {
          const active = isActive(id);
          return (
            <PokemonSticker
              key={id}
              active={active}
              onClick={active ? () => goToDetailPage(id) : null}
            >
              <PokemonId>{`${id}`.padStart(3, "0")}</PokemonId>
              <PokemonImg
                src={getPokemonSvgImg(id)}
                active={active}
                draggable={false}
                alt={`${t("pokemonID")} ${id}`}
                onError={(e) => (e.target.src = BouncePokeballImg)}
              />
            </PokemonSticker>
          );
        })}
      </PokemonsGrid>
    </Wrapper>
  );
};

export default MyPokemonsPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.nav`
  padding: 20px;
  position: relative;
`;

const Title = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: "HANAMDAUM";
  font-size: var(--fs-xl);
`;

const Column = styled.div`
  margin-bottom: 15px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MyPokemonsCount = styled.div`
  font-size: var(--fs-md);
  text-align: center;

  strong {
    font-size: var(--fs-lg);
    font-weight: bold;
    color: var(--pokemon-count-color);
  }
`;

const MyPokemonsFiltering = styled.button`
  padding: 4px 8px;
  border-radius: 5px;
  background-color: var(--selected-option-bg-color);
  font-size: var(--fs-xs);
  color: var(--selected-option-color);
`;

const MyPokemonsEmpty = styled.img`
  margin: 30px 0;
`;

const PokemonsGrid = styled.ul`
  margin: 10px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
`;

const PokemonSticker = styled.li`
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid var(--pokemon-sticker-border-color);
  position: relative;
  cursor: ${({ active }) => active && "pointer"};
`;

const PokemonId = styled.span`
  position: absolute;
  top: 6px;
  left: 8px;
  font-size: var(--fs-xs);
`;

const PokemonImg = styled.img`
  width: 60px;
  height: 60px;
  filter: grayscale(100%);
  opacity: 0.2;
  user-select: none;

  ${({ active }) =>
    active &&
    css`
      filter: none;
      opacity: 1;
    `};
`;
