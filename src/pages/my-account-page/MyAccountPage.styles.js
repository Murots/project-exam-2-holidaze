import styled from "styled-components";
import { feedbackMessageStyle, ActionButton } from "../../styles/GlobalStyles";

export const FeedbackMessage = styled.p`
  ${feedbackMessageStyle}
  margin-right: 20px;
`;

export const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto 50px auto;
`;

export const Heading = styled.h1`
  text-align: center;
  margin-top: 100px;
  margin-bottom: 20px;
`;

export const UserBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: #e2e2e2;
  padding: 40px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  gap: 30px;
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h3`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 400;
`;

export const UserBio = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #666;
`;

export const AvatarChangeContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AvatarInput = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
`;

export const DetailsForm = styled.div`
  padding: 20px;
  background: #f8f8f8;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  flex-basis: 100px;
  flex-shrink: 0;
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
`;

export const TextArea = styled.textarea`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  height: 100px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`;

export const UpdateButton = styled.button`
  ${ActionButton}
  padding: 10px 20px;
`;

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: rgb(248, 248, 248);
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 18px;
`;

export const RedSpan = styled.span`
  color: red;
  font-size: 14px;
  font-style: italic;
`;

export const RadioLabel = styled.label`
  background-color: #f1f1f1;
  color: #666;
  padding: 10px 20px;
  font-family: Arial, sans-serif;
  border-radius: 20px;
  border: 2px solid #ddd;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ddd;
  }

  &.active {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
  }
`;

export const RadioInput = styled.input`
  display: none;
  &:checked + ${RadioLabel} {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
  }
`;
