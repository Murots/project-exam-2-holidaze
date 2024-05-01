import styled from "styled-components";

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

export const Features = styled.div`
  margin-top: 20px;
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const CalendarStyles = styled.div`
  .react-calendar {
    border-radius: 8px;
    max-width: 350px;
  }

  .booked {
    background-color: #ff6961;
    color: white;
  }
`;
