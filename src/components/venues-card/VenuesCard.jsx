import React from "react";
import * as S from "./VenuesCard.styles";
import { useNavigate } from "react-router-dom";

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
