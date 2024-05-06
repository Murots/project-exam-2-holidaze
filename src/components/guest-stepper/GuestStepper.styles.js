import styled from "styled-components";

export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
    background-color: #f9f9f9;
  }
`;

export const NumberDisplay = styled.div`
  min-width: 50px;
  text-align: center;
`;
