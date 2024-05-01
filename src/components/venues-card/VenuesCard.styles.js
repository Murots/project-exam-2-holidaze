import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  grid-column: span ${(props) => (props.rating >= 4 ? 6 : props.rating >= 2 ? 4 : 2)};
  grid-row: span ${(props) => (props.rating >= 4 ? 6 : props.rating >= 2 ? 4 : 2)};
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: ${(props) => (props.rating >= 4 ? "scale(1.1)" : props.rating >= 2 ? "scale(1.15)" : "scale(1.5)")};
    box-shadow: 0 0px 16px rgba(0, 0, 0, 1);
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
`;

export const Location = styled.p`
  font-size: ${(props) => dynamicFontSize(props.rating)};
  color: #666;
  margin: 0px;
`;

export const Rating = styled.span`
  font-size: ${(props) => dynamicFontSize(props.rating)};
`;
