import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalOverlay, ModalContent, CloseIcon, FeedbackMessage, SwitchLink } from "../AuthModals.styles";
import useApi from "../../../hooks/useApi";
import { useAuth } from "../../../contexts/AuthContext";

const signInSchema = yup
  .object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
  })
  .required();

/**
 * Represents the sign-in component within the authentication modal on the platform.
 * Users can log in by entering their email and password. It uses form validation to ensure the input meets specific criteria before submitting to the API. Upon successful authentication, user session details are stored, and the user is logged in. The component handles both successful login and displays errors for login failures.
 *
 * @module SignIn
 * @param {Object} props - Component props including modal control and navigation between auth forms.
 * @param {boolean} props.isOpen - Indicates if the modal is open.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Function} props.switchToRegister - Function to switch to the Register form.
 * @returns {React.Component} The SignIn component, which provides a form for user login.
 * @example
 * return (
 *   <SignIn isOpen={true} onClose={handleClose} switchToRegister={switchToRegisterForm} />
 * )
 */
function SignIn({ isOpen, onClose, switchToRegister }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const { fetchApi } = useApi();
  const [apiError, setApiError] = useState("");
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const loginResponse = await fetchApi("https://v2.api.noroff.dev/auth/login", "POST", data);
      if (loginResponse.data && loginResponse.data.accessToken) {
        const apiKeyResponse = await fetchApi("https://v2.api.noroff.dev/auth/create-api-key", "POST", {}, loginResponse.data.accessToken);
        if (apiKeyResponse && apiKeyResponse.data && apiKeyResponse.data.key) {
          const profileResponse = await fetchApi(`https://v2.api.noroff.dev/holidaze/profiles/${loginResponse.data.name}`, "GET", null, loginResponse.data.accessToken, apiKeyResponse.data.key);
          if (profileResponse && profileResponse.data) {
            login(loginResponse.data, apiKeyResponse.data.key, profileResponse.data.venueManager);
            onClose();
          } else {
            setApiError("Failed to obtain profile data");
          }
        } else {
          setApiError("Failed to obtain API key");
        }
      } else {
        setApiError("Failed to obtain access token");
      }
    } catch (error) {
      console.error("Login Failed", error);
      setApiError(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={onClose} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email")} />
          {errors.email && <FeedbackMessage error>{errors.email.message}</FeedbackMessage>}

          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <FeedbackMessage error>{errors.password.message}</FeedbackMessage>}

          <button type="submit">Sign In</button>
          {apiError && <FeedbackMessage error>{apiError}</FeedbackMessage>}
          <p>
            Not registered? <SwitchLink onClick={switchToRegister}>Create an account</SwitchLink>
          </p>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default SignIn;
