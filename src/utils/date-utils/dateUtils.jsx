export const formatDate = (date) => {
  return date.toLocaleDateString();
};

export const tileClassName =
  (bookings) =>
  ({ date, view }) => {
    if (view === "month") {
      // Simplify the date comparison
      const dayStart = new Date(date).setHours(0, 0, 0, 0);
      const dayEnd = new Date(date).setHours(23, 59, 59, 999);

      return bookings.some((booking) => dayStart >= booking.start.getTime() && dayEnd <= booking.end.getTime()) ? "booked" : undefined;
    }
  };
