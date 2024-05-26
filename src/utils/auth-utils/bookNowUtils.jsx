/**
 * Initiates a booking process for a venue. If not authenticated, it requests user sign-in.
 * Otherwise, it submits the booking details to API.
 *
 * @param {boolean} isAuthenticated - Indicates user authentication status.
 * @param {Object} bookingDetails - Object containing arrivalDate, departureDate, guests, and venueId.
 * @param {function} fetchApi - Function to perform API calls.
 * @param {function} setBookingMessage - Sets a message on successful booking.
 * @param {function} setBookingError - Sets an error message on booking failure.
 */
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
      if (result && result.data && result.data.id) {
        setBookingMessage(`Congratulations! Visit "My Bookings" for booking details.`);
        setBookingError("");
      } else {
        throw new Error("Booking was processed but did not return a valid confirmation.");
      }
    } catch (error) {
      console.error("Failed to book:", error);
      setBookingError("Something went wrong. Try again later.");
      setBookingMessage("");
    }
  }
};
