import styled from "styled-components";
import { LoaderStyle } from "../../styles/GlobalStyles";
import { feedbackMessageStyle } from "../../styles/GlobalStyles";

export const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const VenuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 70px;
  gap: 20px;
  grid-auto-flow: dense;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Heading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  margin-top: 100px;
`;

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
