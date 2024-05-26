import React from "react";
import * as S from "./VenuesCard.styles";
import { useNavigate } from "react-router-dom";

/**
 * Represents a card component for displaying venue information in a visually appealing manner.
 * The card shows the venue's image, name, location, price, and rating. Clicking on the card navigates the user to a detailed page for that specific venue. This component is used within VenuesPage to provide a concise snapshot of key venue details.
 * Size of card based on venue rating.
 *
 * @module VenuesCard
 * @param {Object} props
 * @param {Object} props.venue - The venue data object.
 * @param {number} props.rating - The rating of the venue used for conditional styling and display.
 * @returns {React.Component} The VenuesCard component which acts as an interactive element for accessing detailed venue information.
 * @example
 * return (
 *   <VenuesCard venue={venueData} rating={venueRating} />
 * )
 */
const VenuesCard = ({ venue, rating }) => {
  const { name, media, price, location } = venue;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/venues/${venue.id}`);
  };

  return (
    <S.Card rating={rating} onClick={handleClick}>
      <S.Image src={media[0].url} alt={name} />
      <S.Content>
        <S.TopContent>
          <S.Name rating={rating}>{name}</S.Name>
          <S.RatingBox>
            {rating ? (
              <>
                <S.Rating rating={rating}>{rating}</S.Rating>
                <S.Icon src="/images/mountains-icon.png" alt="Rating icon" />
              </>
            ) : (
              <S.Rating rating={rating}>N/A</S.Rating>
            )}
          </S.RatingBox>
        </S.TopContent>
        <S.InfoRow>
          <S.Location rating={rating}>{`${location.city}, ${location.country}`}</S.Location>
          <S.Price rating={rating}>{`${price} NOK`}</S.Price>
        </S.InfoRow>
      </S.Content>
    </S.Card>
  );
};

export default VenuesCard;
