import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarPicker({ showCalendar, toggleCalendar, onChange, value, label, tileClassName }) {
  return (
    <div>
      <button onClick={toggleCalendar}>
        {label}: {value.toLocaleDateString()}
      </button>
      {showCalendar && <Calendar onChange={onChange} value={value} tileClassName={tileClassName} />}
    </div>
  );
}

export default CalendarPicker;
