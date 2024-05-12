import styled from "styled-components";
import { Link } from "react-router-dom";
import { ChevronIconStyle as BaseChevronIcon } from "../../styles/GlobalStyles";

export const BookingDetailsContainer = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const BookingDetailsHeader = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  background-color: #f7f7f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #efefef;
  }
`;

export const BookingDetailsContent = styled.div`
  display: none;
  &.open {
    display: block;
  }
  padding: 10px 15px;
`;

export const BookingImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 250px;
  object-fit: cover;
`;

export const BookingInfoText = styled.p`
  margin: 5px 0;
`;

export const PriceAndLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TotalPriceText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

export const LinkToVenue = styled(Link)`
  color: #5b1a24;
  font-size: 16px;
  text-decoration: none;
  transition: text-decoration 0.3s ease;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const ChevronIcon = styled(BaseChevronIcon)`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;
