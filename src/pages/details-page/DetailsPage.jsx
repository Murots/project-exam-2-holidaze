// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useApi from "../../hooks/useApi";
// import * as S from "./DetailsPage.styles";
// import CalendarPicker from "../../components/calendar-picker/CalendarPicker";
// import GuestStepper from "../../components/guest-stepper/GuestStepper";
// import { useAuth } from "../../contexts/AuthContext";
// import { handleDateChange, calculateNights, calculateTotalCost } from "../../utils/booking-utils/bookingUtils";
// import { handleBookNow } from "../../utils/auth-utils/bookNowUtils";

// function DetailsPage() {
//   const { id } = useParams();
//   const { fetchApi } = useApi();
//   const { isAuthenticated } = useAuth();
//   const [venue, setVenue] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [arrivalDate, setArrivalDate] = useState(new Date());
//   const [departureDate, setDepartureDate] = useState(new Date());
//   const [selectedGuests, setSelectedGuests] = useState(1);
//   const [showArrivalCalendar, setShowArrivalCalendar] = useState(false);
//   const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);

//   useEffect(() => {
//     fetchApi(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`, "GET")
//       .then((result) => {
//         if (result.data) {
//           setVenue(result.data);
//           const mappedBookings = result.data.bookings.map((booking) => ({
//             start: new Date(new Date(booking.dateFrom).toISOString().split("T")[0]),
//             end: new Date(new Date(booking.dateTo).toISOString().split("T")[0]),
//           }));
//           setBookings(mappedBookings);
//         } else {
//           throw new Error("Venue data is empty");
//         }
//       })
//       .catch((error) => {
//         console.error("Failed to fetch venue details:", error);
//       });
//   }, [id, fetchApi]);

//   const nights = calculateNights(departureDate, arrivalDate);
//   const totalCost = calculateTotalCost(nights, venue?.price || 0);

//   const bookNow = () => handleBookNow(isAuthenticated);

//   if (!venue) return <div>Loading...</div>;

//   return (
//     <S.Container>
//       <S.PageHeader>
//         <S.Image src={venue.media[0]?.url} alt={venue.name || "Venue image"} />
//         <S.Name>{venue.name}</S.Name>
//       </S.PageHeader>
//       <S.Content>
//         <S.Description>{venue.description}</S.Description>
//         <S.BookingHeader>Choose your stay</S.BookingHeader>
//         <S.BookingContainer>
//           <S.BookingOptions>
//             <S.CalendarStyles>
//               <CalendarPicker
//                 showCalendar={showArrivalCalendar}
//                 toggleCalendar={() => setShowArrivalCalendar(!showArrivalCalendar)}
//                 onChange={handleDateChange(setArrivalDate, setShowArrivalCalendar)}
//                 value={arrivalDate}
//                 label="Arrival"
//                 bookings={bookings}
//               />
//             </S.CalendarStyles>
//             <S.CalendarStyles>
//               <CalendarPicker
//                 showCalendar={showDepartureCalendar}
//                 toggleCalendar={() => setShowDepartureCalendar(!showDepartureCalendar)}
//                 onChange={handleDateChange(setDepartureDate, setShowDepartureCalendar)}
//                 value={departureDate}
//                 label="Departure"
//                 bookings={bookings}
//               />
//             </S.CalendarStyles>
//             <S.GuestContainer>
//               <S.Label>Guests:</S.Label>
//               <GuestStepper maxGuests={venue.maxGuests} selectedGuests={selectedGuests} setSelectedGuests={setSelectedGuests} />
//             </S.GuestContainer>
//             <S.BookButton onClick={bookNow}>Book Now</S.BookButton>
//           </S.BookingOptions>
//           <S.PriceContainer>
//             <S.PriceDetail>
//               {nights} nights: {totalCost} NOK
//             </S.PriceDetail>
//           </S.PriceContainer>
//         </S.BookingContainer>
//         <p>
//           <strong>Price per night:</strong> {venue.price} NOK
//         </p>
//         <p>
//           <strong>Maximum guests:</strong> {venue.maxGuests}
//         </p>
//         <S.Features>
//           <strong>Features:</strong>
//           <S.FeaturesList>
//             {venue.meta.wifi && <li>Wifi</li>}
//             {venue.meta.parking && <li>Parking</li>}
//             {venue.meta.breakfast && <li>Breakfast Included</li>}
//             {venue.meta.pets && <li>Pet Friendly</li>}
//           </S.FeaturesList>
//         </S.Features>
//         <p>
//           <strong>Location:</strong> {`${venue.location.address}, ${venue.location.city}, ${venue.location.country}`}
//         </p>
//       </S.Content>
//     </S.Container>
//   );
// }

// export default DetailsPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import * as S from "./DetailsPage.styles";
import CalendarPicker from "../../components/calendar-picker/CalendarPicker";
import GuestStepper from "../../components/guest-stepper/GuestStepper";
import { useAuth } from "../../contexts/AuthContext";
import { handleDateChange, calculateNights, calculateTotalCost, isDatesInvalid } from "../../utils/booking-utils/bookingUtils";
import { handleBookNow } from "../../utils/auth-utils/bookNowUtils";

function DetailsPage() {
  const { id } = useParams();
  const { fetchApi } = useApi();
  const { isAuthenticated } = useAuth();
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [showArrivalCalendar, setShowArrivalCalendar] = useState(false);
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);

  useEffect(() => {
    fetchApi(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`, "GET")
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
    handleBookNow(isAuthenticated, bookingDetails, fetchApi);
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
        </S.BookingContainer>
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
      </S.Content>
    </S.Container>
  );
}

export default DetailsPage;
