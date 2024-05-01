export const formatDate = (date) => {
  return date.toLocaleDateString();
};

export const tileClassName =
  (bookings) =>
  ({ date, view }) => {
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return view === "month" && bookings.some((booking) => checkDate >= booking.start && checkDate <= booking.end) ? "booked" : undefined;
  };
