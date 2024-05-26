import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { PickerButton, ChevronIcon } from "./CalendarPicker.styles";

/**
 * Represents a calendar picker component used to view and select booking dates.
 * This component integrates with a `react-calendar` to provide a visual date selection interface. It highlights dates based on the bookings provided, showing which dates are available and which are booked. The calendar can be toggled open or closed, and displays the selected date above it.
 *
 * @module CalendarPicker
 * @param {Object} props
 * @param {boolean} props.showCalendar - State to show or hide the calendar.
 * @param {Function} props.toggleCalendar - Function to toggle the calendar display.
 * @param {Function} props.onChange - Function to handle changes in the selected date.
 * @param {Date} props.value - The currently selected date.
 * @param {string} props.label - Label for the picker, typically indicating the type of date being selected (e.g., 'Arrival').
 * @param {Array} props.bookings - An array of booking objects, which determine which dates are marked as booked.
 * @returns {React.Component} The CalendarPicker component which provides a user-friendly date picking interface.
 * @example
 * return (
 *   <CalendarPicker
 *     showCalendar={showCalendar}
 *     toggleCalendar={handleToggleCalendar}
 *     onChange={handleDateChange}
 *     value={selectedDate}
 *     label="Check-in Date"
 *     bookings={bookings}
 *   />
 * )
 */
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
