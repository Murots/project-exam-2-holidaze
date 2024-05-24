import React from "react";
import * as S from "./SearchCard.styles";
import { useNavigate } from "react-router-dom";

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
          {rating && (
            <S.RatingBox>
              <S.Rating>{rating}</S.Rating>
              <S.Icon src="/images/mountains-icon.png" alt="Rating icon" />
            </S.RatingBox>
          )}
        </S.Details>
      </S.Info>
    </S.Card>
  );
}

export default SearchCard;
