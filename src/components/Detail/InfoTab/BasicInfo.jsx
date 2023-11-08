import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { languageState } from "../../../recoil";

const BasicInfo = ({ infoName, infoValue }) => {
  // 언어가 'en'인 경우 grid 첫번째 컬럼의 너비를 늘려야함
  const language = useRecoilValue(languageState);

  return (
    <Wrapper language={language}>
      <Dt>{infoName}</Dt>
      <Dd>{infoValue}</Dd>
    </Wrapper>
  );
};

export default BasicInfo;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ language }) =>
    language === "en" ? "150px auto" : "100px auto"};
  line-height: 2;
`;

const Dt = styled.dt`
  font-weight: bold;
`;

const Dd = styled.dd`
  color: var(--pokemon-value-color);
`;
