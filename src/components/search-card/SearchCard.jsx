import React from "react";
import * as S from "./SearchCard.styles";
import { useNavigate } from "react-router-dom";

/**
 * Represents a card component for displaying brief information about a venue.
 * It provides a visual and interactive summary of a venue including its image, name, location, price, and rating.
 * Clicking on the card navigates the user to a detailed page for that specific venue.
 *
 * @module SearchCard
 * @param {Object} props
 * @param {Object} props.venue - The venue data object.
 * @returns {React.Component} The SearchCard component which acts as an interactive element for accessing detailed venue information.
 * @example
 * return (
 *   <SearchCard venue={venueData} />
 * )
 */
function SearchCard({ venue }) {
  const { id, name, media, price, location, rating } = venue;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/venues/${id}`);
  };

  return (
    <S.Card onClick={handleClick}>
      <S.VenueImage src={media[0]?.url || "placeholder.jpg"} alt={name} />
      <S.Info>
        <S.VenueName>{name}</S.VenueName>
        <S.VenueCity>{venue.location.city}</S.VenueCity>
        <S.Details>
          <S.VenuePrice>{price} NOK</S.VenuePrice>
          {rating ? (
            <S.RatingBox>
              <S.Rating>{rating}</S.Rating>
              <S.Icon src="/images/mountains-icon.png" alt="Rating icon" />
            </S.RatingBox>
          ) : (
            <S.RatingBox>
              <S.Rating>N/A</S.Rating>
            </S.RatingBox>
          )}
        </S.Details>
      </S.Info>
    </S.Card>
  );
}

export default SearchCard;
