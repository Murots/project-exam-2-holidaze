import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 10px;
  transition: box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const VenueImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 10px;
  object-fit: cover;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const VenueName = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

export const VenueCity = styled.span`
  color: #666;
  font-size: 0.8rem;
`;

export const VenuePrice = styled.span`
  color: #333;
  font-size: 0.9rem;
`;

export const RatingBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #5b1a24;
  color: white;
  padding: 3px 7px;
  border-radius: 5px;
  gap: 2px;
`;

export const Icon = styled.img`
  width: 25px;
  height: auto;
`;

export const Rating = styled.span`
  font-size: 0.9rem;
`;
