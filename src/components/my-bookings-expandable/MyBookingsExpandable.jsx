import React, { useState } from "react";
import * as S from "./MyBookingsExpandable.styles";

const MyBookingsExpandable = ({ booking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { venue, dateFrom, dateTo, guests } = booking;
  const nights = (new Date(dateTo) - new Date(dateFrom)) / (1000 * 3600 * 24);
  const totalPrice = Math.round(venue.price * nights);

  const toggleDetails = () => setIsOpen(!isOpen);

  return (
    <S.BookingDetailsContainer>
      <S.BookingDetailsHeader onClick={toggleDetails}>
        <span>
          {venue.name} - {new Date(dateFrom).toLocaleDateString()} to {new Date(dateTo).toLocaleDateString()}
        </span>
        <S.ChevronIcon isOpen={isOpen} />
      </S.BookingDetailsHeader>
      <S.BookingDetailsContent className={isOpen ? "open" : ""}>
        <S.BookingImage src={venue.media[0].url} alt={venue.media[0].alt || "Venue image"} />
        <S.BookingInfoText>
          <strong>Venue:</strong> {venue.name}
        </S.BookingInfoText>
        <S.BookingInfoText>
          <strong>Dates:</strong> {new Date(dateFrom).toLocaleDateString()} - {new Date(dateTo).toLocaleDateString()}
        </S.BookingInfoText>
        <S.BookingInfoText>
          <strong>Nights:</strong> {nights}
        </S.BookingInfoText>
        <S.BookingInfoText>
          <strong>Guests:</strong> {guests}
        </S.BookingInfoText>
        <S.PriceAndLinkContainer>
          <S.TotalPriceText>
            <strong>Total Price:</strong> ${totalPrice}
          </S.TotalPriceText>
          <S.LinkToVenue to={`/venues/${venue.id}`}>More about this venue</S.LinkToVenue>
        </S.PriceAndLinkContainer>
      </S.BookingDetailsContent>
    </S.BookingDetailsContainer>
  );
};

export default MyBookingsExpandable;
