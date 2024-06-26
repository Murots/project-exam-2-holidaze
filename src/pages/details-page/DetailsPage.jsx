import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import * as S from "./DetailsPage.styles";
import CalendarPicker from "../../components/calendar-picker/CalendarPicker";
import GuestStepper from "../../components/guest-stepper/GuestStepper";
import { useAuth } from "../../contexts/AuthContext";
import { handleDateChange, calculateNights, calculateTotalCost, isDatesInvalid } from "../../utils/booking-utils/bookingUtils";
import { handleBookNow } from "../../utils/auth-utils/bookNowUtils";

/**
 * Represents the component that displays detailed information about a specific venue on the Holidaze platform.
 * Users can view comprehensive details about a venue, select dates for booking, and choose the number of guests.
 * The page also features dynamic calculations of total costs based on the selected dates and displays the availability based on existing bookings.
 * It leverages the `useParams` hook to retrieve the venue ID from the URL and fetches data using a custom `useApi` hook.
 * User interactions, such as date selection and guest count adjustments, are handled with interactive calendar and stepper components.
 *
 * @module DetailsPage
 * @returns {React.Component} The DetailsPage component which provides a detailed view of a venue including availability, booking options, and detailed venue information.
 * @example
 * return (
 *   <DetailsPage />
 * )
 */
function DetailsPage() {
  const { id } = useParams();
  const { fetchApi } = useApi();
  const { isAuthenticated } = useAuth();
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [showArrivalCalendar, setShowArrivalCalendar] = useState(false);
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchApi(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true&_owner=true`, "GET")
      .then((result) => {
        if (result.data) {
          setVenue(result.data);
          const mappedBookings = result.data.bookings.map((booking) => ({
            start: new Date(new Date(booking.dateFrom).toISOString().split("T")[0]),
            end: new Date(new Date(booking.dateTo).toISOString().split("T")[0]),
          }));
          setBookings(mappedBookings);
        } else {
          throw new Error("Venue data is empty");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch venue details:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, fetchApi]);

  const nights = calculateNights(departureDate, arrivalDate);
  const totalCost = calculateTotalCost(nights, venue?.price || 0);
  const isInvalid = isDatesInvalid(new Date(arrivalDate), new Date(departureDate), bookings);

  const bookNow = () => {
    const bookingDetails = {
      arrivalDate,
      departureDate,
      guests: selectedGuests,
      venueId: id,
    };
    handleBookNow(isAuthenticated, bookingDetails, fetchApi, setBookingMessage, setBookingError);
  };

  if (isLoading) {
    return <S.Loader />;
  }

  if (isError || !venue) {
    return (
      <S.Container>
        <S.FeedbackMessage error>Network error. Please try again later.</S.FeedbackMessage>
      </S.Container>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Holidaze | Details</title>
        <meta
          name="description"
          content="See the detail information about this venue. Select arrival and departure dates in the calendar, as well as number of guests, to make a booking. Red dates are unavailable. The total cost of your stay is provided right away - no hidden costs."
        />
      </Helmet>
      <S.Container>
        <S.PageHeader>
          <S.Image src={venue.media[0]?.url} alt={venue.name || "Venue image"} />
          <S.Name>{venue.name}</S.Name>
        </S.PageHeader>
        <S.Content>
          <S.Description>{venue.description}</S.Description>
          <S.BookingHeader>Choose your stay</S.BookingHeader>
          <S.BookingContainer>
            <S.BookingOptions>
              <S.CalendarStyles>
                <CalendarPicker
                  showCalendar={showArrivalCalendar}
                  toggleCalendar={() => setShowArrivalCalendar(!showArrivalCalendar)}
                  onChange={handleDateChange(setArrivalDate, setShowArrivalCalendar)}
                  value={arrivalDate}
                  label="Arrival"
                  bookings={bookings}
                />
              </S.CalendarStyles>
              <S.CalendarStyles>
                <CalendarPicker
                  showCalendar={showDepartureCalendar}
                  toggleCalendar={() => setShowDepartureCalendar(!showDepartureCalendar)}
                  onChange={handleDateChange(setDepartureDate, setShowDepartureCalendar)}
                  value={departureDate}
                  label="Departure"
                  bookings={bookings}
                />
              </S.CalendarStyles>
              <S.GuestContainer>
                <S.Label>Guests:</S.Label>
                <GuestStepper maxGuests={venue.maxGuests} selectedGuests={selectedGuests} setSelectedGuests={setSelectedGuests} />
              </S.GuestContainer>
              <S.BookButton onClick={bookNow} disabled={isInvalid}>
                Book Now
              </S.BookButton>
            </S.BookingOptions>
            <S.PriceContainer>
              <S.PriceDetail>
                {nights} nights: {totalCost} NOK
              </S.PriceDetail>
            </S.PriceContainer>
            <S.LegendContainer>
              <S.LegendSquare />
              <S.LegendText>= Not available</S.LegendText>
            </S.LegendContainer>
            {bookingMessage && <S.FeedbackMessage>{bookingMessage}</S.FeedbackMessage>}
            {bookingError && <S.FeedbackMessage error>{bookingError}</S.FeedbackMessage>}
          </S.BookingContainer>
          <p>
            <strong>Price per night:</strong> {venue.price} NOK
          </p>
          <p>
            <strong>Maximum guests:</strong> {venue.maxGuests}
          </p>
          <S.Features>
            <strong>Facilities:</strong>
            <S.FeaturesList>
              {venue.meta.wifi && <li>Wifi</li>}
              {venue.meta.parking && <li>Parking</li>}
              {venue.meta.breakfast && <li>Breakfast Included</li>}
              {venue.meta.pets && <li>Pet Friendly</li>}
            </S.FeaturesList>
          </S.Features>
          <p>
            <strong>Location:</strong> {`${venue.location.city}, ${venue.location.country}`}
          </p>
          <S.OwnerContainer>
            <S.OwnerAvatar src={venue.owner.avatar.url} alt={venue.owner.avatar.alt || "Owner avatar"} />
            <div>
              <S.OwnerName>{venue.owner.name}</S.OwnerName>
              <S.OwnerBio>{venue.owner.bio || "No bio available"}</S.OwnerBio>
            </div>
          </S.OwnerContainer>
        </S.Content>
      </S.Container>
    </div>
  );
}

export default DetailsPage;
