import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import * as S from "./DetailsPage.styles";
import CalendarPicker from "../../components/calendar-picker/CalendarPicker";
import { tileClassName } from "../../utils/date-utils/dateUtils";

function DetailsPage() {
  const { id } = useParams();
  const { get } = useApi();
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showArrivalCalendar, setShowArrivalCalendar] = useState(false);
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);

  useEffect(() => {
    get(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`)
      .then((response) => {
        if (response.data) {
          setVenue(response.data);
          const mappedBookings = response.data.bookings.map((booking) => ({
            start: new Date(new Date(booking.dateFrom).setHours(0, 0, 0, 0)),
            end: new Date(new Date(booking.dateTo).setHours(23, 59, 59, 999)),
          }));
          setBookings(mappedBookings);
        } else {
          throw new Error("Venue data is empty");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch venue details:", error);
      });
  }, [id, get]);

  const handleDateChange = (setter, toggler) => (value) => {
    setter(value);
    toggler(false);
  };

  if (!venue) return <div>Loading...</div>;

  return (
    <S.Container>
      <S.PageHeader>
        <S.Image src={venue.media[0]?.url} alt={venue.name || "Venue image"} />
        <S.Name>{venue.name}</S.Name>
      </S.PageHeader>
      <S.Content>
        <S.Description>{venue.description}</S.Description>
        <p>
          <strong>Price per night:</strong> {venue.price} NOK
        </p>
        <p>
          <strong>Maximum guests:</strong> {venue.maxGuests}
        </p>
        <S.Features>
          <strong>Features:</strong>
          <S.FeaturesList>
            {venue.meta.wifi && <li>Wifi</li>}
            {venue.meta.parking && <li>Parking</li>}
            {venue.meta.breakfast && <li>Breakfast Included</li>}
            {venue.meta.pets && <li>Pet Friendly</li>}
          </S.FeaturesList>
        </S.Features>
        <p>
          <strong>Location:</strong> {`${venue.location.address}, ${venue.location.city}, ${venue.location.country}`}
        </p>
        <S.CalendarStyles>
          <CalendarPicker
            showCalendar={showArrivalCalendar}
            toggleCalendar={() => setShowArrivalCalendar(!showArrivalCalendar)}
            onChange={handleDateChange(setArrivalDate, setShowArrivalCalendar)}
            value={arrivalDate}
            label="Select Arrival Date"
            tileClassName={tileClassName(bookings)}
          />
          <CalendarPicker
            showCalendar={showDepartureCalendar}
            toggleCalendar={() => setShowDepartureCalendar(!showDepartureCalendar)}
            onChange={handleDateChange(setDepartureDate, setShowDepartureCalendar)}
            value={departureDate}
            label="Select Departure Date"
            tileClassName={tileClassName(bookings)}
          />
        </S.CalendarStyles>
      </S.Content>
    </S.Container>
  );
}

export default DetailsPage;
