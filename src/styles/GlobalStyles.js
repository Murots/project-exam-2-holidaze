import { css } from "styled-components";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";

export const ChevronIconStyle = styled(FaChevronDown)`
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
  font-size: 13px;
`;

export const feedbackMessageStyle = css`
  color: ${(props) => (props.error ? "red" : "green")};
  font-size: 14px;
`;
