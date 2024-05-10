import styled from "styled-components";
import { feedbackMessageStyle } from "../../styles/GlobalStyles";

export const FeedbackMessage = styled.p`
  ${feedbackMessageStyle}
  margin-top: 20px;
  margin-bottom: 0px;
`;

export const Container = styled.div`
  padding: 20px;
  background: #fff;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px -20px 0 -20px;
`;

export const Name = styled.h1`
  margin-top: 40px;
`;

export const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
`;

export const Content = styled.div`
  margin: 20px 0 50px 0;
`;

export const Description = styled.p`
  font-size: 18px;
  margin-bottom: 40px;
`;

export const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin: 20px 0 40px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

export const BookingHeader = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

export const BookingOptions = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const GuestContainer = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  border: 1px solid rgb(204, 204, 204);
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 800px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const CalendarStyles = styled.div`
  position: relative;

  .react-calendar {
    border-radius: 8px;
    max-width: 300px;
    position: absolute;
    z-index: 1000;
    top: 100%;
    left: 0;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);

    @media (max-width: 800px) {
      left: auto;
      right: 0;
    }
  }

  .booked {
    background-color: #ff6961;
    color: white;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  margin-right: 10px;
`;

export const BookButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #c8c8c8;
    cursor: not-allowed;
    color: #a8a8a8;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const PriceContainer = styled.div`
  background-color: #e2e2e2;
  border-radius: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PriceDetail = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export const LegendContainer = styled.div`
  display: flex;
  margin-top: 10px;
  align-self: start;
`;

export const LegendSquare = styled.span`
  width: 16px;
  height: 16px;
  background-color: #ff6961;
  display: inline-block;
  margin-right: 8px;
`;

export const LegendText = styled.span`
  font-size: 14px;
  color: #333;
`;

export const Features = styled.div`
  margin-top: 20px;
`;

export const FeaturesList = styled.ul`
  // list-style: none;
  // padding: 0;
`;
