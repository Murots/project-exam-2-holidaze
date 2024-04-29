import React from "react";
import * as S from "./VenuesCard.styles";

const VenuesCard = ({ venue, rating }) => {
  const { name, media, price, location } = venue;
  const imageUrl = media.length > 0 ? media[0].url : "https://via.placeholder.com/300";
  const imageAlt = media.length > 0 ? media[0].alt || "Venue Image" : "No image available";

  return (
    <S.Card rating={rating}>
      <S.Image src={imageUrl} alt={imageAlt} />
      <S.Content>
        <S.Name>{name}</S.Name>
        {/* <S.Description>{venue.description}</S.Description> */}
        <S.Price>{`Price: ${price} NOK`}</S.Price>
        <S.Location>{`${location.city}, ${location.country}`}</S.Location>
      </S.Content>
    </S.Card>
  );
};

export default VenuesCard;
