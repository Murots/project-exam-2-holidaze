import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { PickerButton, ChevronIcon } from "./CalendarPicker.styles";

function CalendarPicker({ showCalendar, toggleCalendar, onChange, value, label, tileClassName }) {
  return (
    <div>
      <PickerButton onClick={toggleCalendar}>
        {label}: {value.toLocaleDateString()} <ChevronIcon />
      </PickerButton>
      {showCalendar && <Calendar onChange={onChange} value={value} tileClassName={tileClassName} />}
    </div>
  );
}

export default CalendarPicker;
