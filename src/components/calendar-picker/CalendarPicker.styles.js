import styled from "styled-components";
import { ChevronIconStyle as GlobalChevronIcon } from "../../styles/GlobalStyles";

export const PickerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ChevronIcon = styled(GlobalChevronIcon)`
  margin-left: 8px;
`;
