import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalOverlay, ModalContent, CloseIcon, FeedbackMessage } from "../AuthModals.styles";
import useApi from "../../../hooks/useApi";
import { useAuth } from "../../../contexts/AuthContext";

const signInSchema = yup
  .object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
  })
  .required();

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
          login(loginResponse.data, apiKeyResponse.data.key);
          onClose();
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
            Not registered?{" "}
            <a href="#" onClick={switchToRegister}>
              Create an account
            </a>
          </p>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default SignIn;