import { css } from "styled-components";

export const feedbackMessageStyle = css`
  color: ${(props) => (props.error ? "red" : "green")};
  font-size: 14px;
`;
