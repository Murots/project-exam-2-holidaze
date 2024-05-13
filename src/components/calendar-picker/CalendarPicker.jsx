import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { PickerButton, ChevronIcon } from "./CalendarPicker.styles";

function CalendarPicker({ showCalendar, toggleCalendar, onChange, value, label, bookings }) {
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const checkDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

      return bookings.some((booking) => checkDate >= new Date(booking.start) && checkDate <= new Date(booking.end)) ? "booked" : undefined;
    }
  };

  return (
    <div>
      <PickerButton onClick={toggleCalendar}>
        {label}: {value.toLocaleDateString()} <ChevronIcon isOpen={showCalendar} />
      </PickerButton>
      {showCalendar && <Calendar onChange={onChange} value={value} tileClassName={tileClassName} />}
    </div>
  );
}

export default CalendarPicker;
