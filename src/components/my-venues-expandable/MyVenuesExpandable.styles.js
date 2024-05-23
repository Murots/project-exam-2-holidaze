import styled from "styled-components";
import { ChevronIconStyle as BaseChevronIcon } from "../../styles/GlobalStyles";
import { feedbackMessageStyle, ActionButton } from "../../styles/GlobalStyles";

export const VenueDetailsContainer = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const VenueDetailsHeader = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  background-color: #f7f7f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #efefef;
  }
`;

export const VenueDetailsContent = styled.div`
  display: none;
  &.open {
    display: block;
  }
  padding: 10px 15px;
`;

export const VenueImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 250px;
  object-fit: cover;
`;

export const VenueInfoText = styled.p`
  margin: 5px 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
`;

export const FeedbackMessage = styled.p`
  ${feedbackMessageStyle}
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 5px 0;

  input {
    margin-right: 10px;
  }
`;

export const ChevronIcon = styled(BaseChevronIcon)`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LinkButton = styled.button`
  font-size: 14px;
  color: #5b1a24;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
  padding: 0;
`;

export const Button = styled.button`
  ${ActionButton}
  padding: 10px 20px;
  margin-top: 10px;

  &:disabled {
    background-color: #c8c8c8;
    cursor: not-allowed;
  }
`;

export const DelButton = styled.button`
  ${ActionButton}
  background-color: #ad2020;
  padding: 10px 20px;
  margin-top: 10px;
  margin-left: 30px;

  &:hover {
    background-color: #b91b1b;
  }
`;
