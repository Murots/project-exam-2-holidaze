import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  grid-column: span ${(props) => (props.rating >= 4 ? 4 : props.rating >= 2 ? 2 : 1)};
  grid-row: span ${(props) => (props.rating >= 4 ? 4 : props.rating >= 2 ? 2 : 1)};
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const Content = styled.div`
  padding: 15px;
`;

export const Name = styled.h2`
  font-size: 18px;
  color: #333;
`;

export const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

export const Location = styled.p`
  font-size: 14px;
  color: #666;
`;

// export const Meta = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 12px;
//   color: #777;
//   margin-top: 10px;
//   padding: 0 15px 15px;
// `;
