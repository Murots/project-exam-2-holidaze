/**
 * Handles changes to date inputs, sets the new date, and closes the calendar picker.
 * @param {function} setter - Function to set the selected date.
 * @param {function} toggler - Function to toggle the visibility of the calendar picker.
 * @returns {function} A function that takes a date value, sets it, and toggles the picker off.
 */
export const handleDateChange = (setter, toggler) => (value) => {
  setter(value);
  toggler(false);
};

/**
 * Calculates the number of nights between two dates.
 * @param {Date} departureDate - The departure date.
 * @param {Date} arrivalDate - The arrival date.
 * @returns {number} The number of nights between the two dates.
 */
export const calculateNights = (departureDate, arrivalDate) => {
  const timeDiff = departureDate - arrivalDate;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return Math.max(daysDiff, 0);
};

/**
 * Calculates the total cost of stay based on the number of nights and price per night.
 * @param {number} nights - Number of nights.
 * @param {number} pricePerNight - Price per night.
 * @returns {number} Total cost of the stay.
 */
export const calculateTotalCost = (nights, pricePerNight) => {
  return nights * pricePerNight || 0;
};

/**
 * Checks if a given date is before today's date.
 * @param {Date} date - The date to check.
 * @returns {boolean} True if the date is before today, false otherwise.
 */
const isBeforeToday = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Determines if the selected dates are invalid due to being past dates or overlapping with existing bookings.
 * @param {Date} newArrivalDate - The newly selected arrival date.
 * @param {Date} newDepartureDate - The newly selected departure date.
 * @param {Array} bookings - Array of existing bookings.
 * @returns {boolean} True if the dates are invalid, false otherwise.
 */
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
