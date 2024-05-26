import React from "react";
import { StepperContainer, Button, NumberDisplay } from "./GuestStepper.styles";

/**
 * Represents a numerical stepper component used to increment or decrement the number of guests within a defined range.
 * Used in DetailsPage as part of the booking process.
 *
 * @module GuestStepper
 * @param {Object} props
 * @param {number} props.maxGuests - The maximum number of guests that can be selected.
 * @param {number} props.selectedGuests - The current number of selected guests.
 * @param {Function} props.setSelectedGuests - The function to update the number of selected guests.
 * @returns {React.Component} The GuestStepper component, which provides a user interface for adjusting guest numbers.
 * @example
 * return (
 *   <GuestStepper
 *     maxGuests={5}
 *     selectedGuests={2}
 *     setSelectedGuests={setSelectedGuests}
 *   />
 * )
 */
function GuestStepper({ maxGuests, selectedGuests, setSelectedGuests }) {
  const handleIncrement = () => {
    if (selectedGuests < maxGuests) {
      setSelectedGuests(selectedGuests + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedGuests > 1) {
      setSelectedGuests(selectedGuests - 1);
    }
  };

  return (
    <StepperContainer>
      <Button onClick={handleDecrement} disabled={selectedGuests <= 1}>
        -
      </Button>
      <NumberDisplay>{selectedGuests}</NumberDisplay>
      <Button onClick={handleIncrement} disabled={selectedGuests >= maxGuests}>
        +
      </Button>
    </StepperContainer>
  );
}

export default GuestStepper;
