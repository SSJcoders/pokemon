import styled from "styled-components";

const BasicInfo = ({ infoName, infoValue }) => {
  return (
    <Wrapper>
      <Dt>{infoName}</Dt>
      <Dd>{infoValue}</Dd>
    </Wrapper>
  );
};

export default BasicInfo;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  line-height: 2;
`;

const Dt = styled.dt`
  font-weight: bold;
`;

const Dd = styled.dd`
  color: var(--pokemon-value-color);
`;
