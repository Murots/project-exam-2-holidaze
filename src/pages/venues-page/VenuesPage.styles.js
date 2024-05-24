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

  @media (max-width: 1068px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 650px) {
    grid-template-columns: repeat(4, 1fr);
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

export const SortContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const SortLabel = styled.label`
  font-size: 16px;
  margin-right: 10px;
`;

export const SortSelect = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;
