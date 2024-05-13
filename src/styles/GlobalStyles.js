import { css, keyframes } from "styled-components";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoaderStyle = css`
  border: 16px solid #f3f3f3;
  border-top: 16px solid darkslategray;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const ChevronIconStyle = styled(({ isOpen, ...props }) => <FaChevronDown {...props} />)`
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

export const feedbackMessageStyle = css`
  color: ${(props) => (props.error ? "red" : "green")};
  font-size: 14px;
`;
