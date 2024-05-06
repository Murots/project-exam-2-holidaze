import React from "react";
import { StepperContainer, Button, NumberDisplay } from "./GuestStepper.styles";

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
