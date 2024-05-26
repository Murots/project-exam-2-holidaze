import React, { useState } from "react";
import * as S from "./MyBookingsExpandable.styles";

/**
 * Represents an expandable component that displays detailed information about a specific booking.
 * It shows the key booking details - venue name and booking dates.
 * Users can click on the item to expand or collapse the section to view more detailed information including an image of the venue, number of nights and guests, total price, and a link for more details about the venue.
 * The calculation for the number of nights and total price is dynamically generated based on the booking data.
 *
 * @module MyBookingsExpandable
 * @param {Object} props
 * @param {Object} props.booking - The booking data object.
 * @returns {React.Component} The MyBookingsExpandable component, which allows users to view and interact with their specific booking details.
 * @example
 * return (
 *   <MyBookingsExpandable booking={bookingData} />
 * )
 */
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
