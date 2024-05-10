/**
 * Handles changes in date input fields and hides the calendar picker.
 */
export const handleDateChange = (setter, toggler) => (value) => {
  setter(value);
  toggler(false);
};

/**
 * Calculates the number of nights between two dates.
 */
export const calculateNights = (departureDate, arrivalDate) => {
  const timeDiff = departureDate - arrivalDate;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return Math.max(daysDiff, 0);
};

/**
 * Calculates the total cost based on the number of nights and the venue price.
 */
export const calculateTotalCost = (nights, pricePerNight) => {
  return nights * pricePerNight || 0;
};

/**
 * Check if picked dates are invalid
 */
const isBeforeToday = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export const isDatesInvalid = (newArrivalDate, newDepartureDate, bookings) => {
  if (isBeforeToday(newArrivalDate) || isBeforeToday(newDepartureDate) || newArrivalDate >= newDepartureDate) {
    return true;
  }

  return bookings.some((booking) => {
    const bookedArrival = new Date(booking.start);
    const bookedDeparture = new Date(booking.end);
    return newArrivalDate < bookedDeparture && newDepartureDate > bookedArrival;
  });
};
