import { css } from "styled-components";

const ElevatedButton = css`
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  background-color: var(--option-bg-color);
  font-size: var(--fs-md);
  color: var(--option-color);

  ${({ selected }) =>
    selected &&
    css`
      background-color: var(--selected-option-bg-color);
      color: var(--selected-option-color);
      box-shadow: 0px 10px 20px rgba(234, 93, 96, 0.3);
    `}
`;

export default ElevatedButton;
