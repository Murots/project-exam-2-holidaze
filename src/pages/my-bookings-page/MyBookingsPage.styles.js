import styled from "styled-components";
import { feedbackMessageStyle, LoaderStyle } from "../../styles/GlobalStyles";

export const FeedbackMessage = styled.p`
  ${feedbackMessageStyle}
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Loader = styled.div`
  ${LoaderStyle}
`;

export const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto 50px auto;
`;

export const Heading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  margin-top: 100px;
`;
