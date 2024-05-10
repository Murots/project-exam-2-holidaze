// export const handleBookNow = async (isAuthenticated, bookingDetails, fetchApi) => {
//   if (!isAuthenticated) {
//     const event = new Event("requestSignIn");
//     window.dispatchEvent(event);
//   } else {
//     const token = sessionStorage.getItem("token");
//     const apiKey = sessionStorage.getItem("apiKey");
//     console.log(apiKey);
//     const { arrivalDate, departureDate, guests, venueId } = bookingDetails;
//     const data = {
//       dateFrom: arrivalDate.toISOString(),
//       dateTo: departureDate.toISOString(),
//       guests: guests,
//       venueId: venueId,
//     };
//     try {
//       const result = await fetchApi("https://v2.api.noroff.dev/holidaze/bookings", "POST", data, token, apiKey);
//       console.log("Booking successful:", result);
//     } catch (error) {
//       console.error("Failed to book:", error);
//     }
//   }
// };
export const handleBookNow = async (isAuthenticated, bookingDetails, fetchApi, setBookingMessage, setBookingError) => {
  if (!isAuthenticated) {
    const event = new Event("requestSignIn");
    window.dispatchEvent(event);
  } else {
    const token = sessionStorage.getItem("token");
    const apiKey = sessionStorage.getItem("apiKey");
    const { arrivalDate, departureDate, guests, venueId } = bookingDetails;

    const formatAsUTC = (date) => {
      const d = new Date(date);
      return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
    };

    const data = {
      dateFrom: formatAsUTC(arrivalDate),
      dateTo: formatAsUTC(departureDate),
      guests: guests,
      venueId: venueId,
    };

    try {
      const result = await fetchApi("https://v2.api.noroff.dev/holidaze/bookings", "POST", data, token, apiKey);
      setBookingMessage("Congratulations! Visit 'My Bookings' to view your booking details.");
      setBookingError("");
    } catch (error) {
      console.error("Failed to book:", error);
      setBookingError("Something went wrong. Try again later.");
      setBookingMessage("");
    }
  }
};
