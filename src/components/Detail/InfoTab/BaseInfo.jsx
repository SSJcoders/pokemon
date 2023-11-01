import styled from "styled-components";

const BaseInfo = ({ infoName, infoValue }) => {
  return (
    <Wrapper>
      <Dt>{infoName}</Dt>
      <Dd>{infoValue}</Dd>
    </Wrapper>
  );
};

export default BaseInfo;

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
