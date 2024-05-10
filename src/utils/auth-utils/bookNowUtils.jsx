// /**
//  * Triggers an event to request sign-in, used when an unauthenticated user attempts to book.
//  */
// export const handleBookNow = (isAuthenticated) => {
//   if (!isAuthenticated) {
//     const event = new Event("requestSignIn");
//     window.dispatchEvent(event);
//   } else {
//     // Future booking logic can be handled here
//   }
// };

export const handleBookNow = async (isAuthenticated, bookingDetails, fetchApi) => {
  if (!isAuthenticated) {
    const event = new Event("requestSignIn");
    window.dispatchEvent(event);
  } else {
    const token = sessionStorage.getItem("token");
    const apiKey = sessionStorage.getItem("apiKey");
    console.log(apiKey);
    const { arrivalDate, departureDate, guests, venueId } = bookingDetails;
    const data = {
      dateFrom: arrivalDate.toISOString(),
      dateTo: departureDate.toISOString(),
      guests: guests,
      venueId: venueId,
    };
    try {
      const result = await fetchApi("https://v2.api.noroff.dev/holidaze/bookings", "POST", data, token, apiKey);
      console.log("Booking successful:", result);
    } catch (error) {
      console.error("Failed to book:", error);
    }
  }
};
