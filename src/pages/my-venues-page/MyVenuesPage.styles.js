import styled from "styled-components";
import { feedbackMessageStyle, LoaderStyle } from "../../styles/GlobalStyles";

export const FeedbackMessage = styled.p`
  ${feedbackMessageStyle}
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto 50px auto;
`;

export const Heading = styled.h1`
  text-align: center;
  margin-top: 100px;
  margin-bottom: 20px;
`;

export const Loader = styled.div`
  ${LoaderStyle}
`;
