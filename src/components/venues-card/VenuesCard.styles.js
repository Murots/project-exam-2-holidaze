import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  grid-column: span ${(props) => (props.rating >= 4 ? 6 : props.rating >= 2 ? 4 : 2)};
  grid-row: span ${(props) => (props.rating >= 4 ? 6 : props.rating >= 2 ? 4 : 2)};
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: ${(props) => (props.rating >= 4 ? "scale(1.05)" : props.rating >= 2 ? "scale(1.08)" : "scale(1.25)")};
    box-shadow: 0 0px 16px rgba(0, 0, 0, 3);
  }

  @media (max-width: 1068px) {
    &:hover {
      transform: ${(props) => (props.rating >= 4 ? "scale(1.03)" : props.rating >= 2 ? "scale(1.04)" : "scale(1.09)")};
    }
  }

  @media (max-width: 650px) {
    grid-column: span ${(props) => (props.rating >= 4 ? 2 : props.rating >= 2 ? 2 : 2)};
    grid-row: span ${(props) => (props.rating >= 4 ? 2 : props.rating >= 2 ? 2 : 2)};

    &:hover {
      transform: ${(props) => (props.rating >= 4 ? "scale(1.09)" : props.rating >= 2 ? "scale(1.09)" : "scale(1.09)")};
    }
  }

  @media (max-width: 400px) {
    grid-column: span ${(props) => (props.rating >= 4 ? 4 : props.rating >= 2 ? 4 : 4)};
    grid-row: span ${(props) => (props.rating >= 4 ? 2 : props.rating >= 2 ? 2 : 2)};
  }
`;

export const Image = styled.img`
  width: auto;
  flex-grow: 0;
  flex-shrink: 0;
  height: 70%;
  object-fit: cover;
`;

export const Content = styled.div`
  padding: 4%;
  height: 30%;
  align-content: center;
`;

export const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Name = styled.h2`
  font-size: ${(props) => (props.rating >= 4 ? "24px" : props.rating >= 2 ? "18px" : "12px")};
  margin: ${(props) => (props.rating >= 4 ? "0 0 15px 0" : props.rating >= 2 ? "0 0 10px 0" : "0 0 5px 0")};

  @media (max-width: 650px) {
    font-size: 12px;
    margin: ${(props) => (props.rating >= 4 ? "0 0 5px 0" : props.rating >= 2 ? "0 0 5px 0" : "0 0 5px 0")};
  }
`;

export const RatingBox = styled.div`
  background-color: #5b1a24;
  color: white;
  padding: 3px 7px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const Icon = styled.img`
  width: 25px;
  height: auto;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const dynamicFontSize = (rating) => {
  if (rating >= 4) return "20px";
  if (rating >= 2) return "16px";
  return "10px";
};

export const Price = styled.p`
  font-size: ${(props) => dynamicFontSize(props.rating)};
  font-weight: bold;
  margin: 0px;

  @media (max-width: 650px) {
    font-size: 10px;
  }
`;

export const Location = styled.p`
  font-size: ${(props) => dynamicFontSize(props.rating)};
  color: #666;
  margin: 0px;

  @media (max-width: 650px) {
    font-size: 10px;
  }
`;

export const Rating = styled.span`
  font-size: ${(props) => dynamicFontSize(props.rating)};

  @media (max-width: 650px) {
    font-size: 10px;
  }
`;
