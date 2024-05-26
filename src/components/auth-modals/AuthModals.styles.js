import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { feedbackMessageStyle } from "../../styles/GlobalStyles";

export const FeedbackMessage = styled.p`
  ${feedbackMessageStyle}
  margin-top: 20px;
  margin-bottom: 0px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Ensure it's above other content
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  position: relative;

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 8px;
      margin-top: 20px;
      font-weight: bold;
    }

    input {
      margin-bottom: 0px;
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
      margin-top: 20px;

      &:hover {
        background-color: #45a049;
      }
    }

    p {
      margin-top: 10px;
      font-size: 14px;

      a {
        color: #0066cc;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #333;
  font-size: 20px;

  &:hover {
    color: #000;
  }
`;

export const SwitchLink = styled.a`
  cursor: pointer;
`;
