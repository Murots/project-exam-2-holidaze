import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalOverlay, ModalContent, CloseIcon, ErrorMessage } from "../AuthModals.styles";
import useApi from "../../../hooks/useApi"; // Adjust path as necessary

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
  const { post } = useApi();

  const onSubmit = async (data) => {
    console.log("SignIn Data", data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={onClose} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email")} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          <button type="submit">Sign In</button>
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
