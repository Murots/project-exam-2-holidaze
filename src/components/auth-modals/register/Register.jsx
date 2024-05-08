// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { ModalOverlay, ModalContent, CloseIcon, ErrorMessage, SuccessMessage } from "../AuthModals.styles";
// import useApi from "../../../hooks/useApi";

// const registerSchema = yup
//   .object({
//     name: yup.string().min(3, "Username must be at least 3 characters long").required("Username is required"),
//     email: yup.string().email("Invalid email format").required("Email is required"),
//     password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
//   })
//   .required();

// function Register({ isOpen, onClose, switchToSignIn }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(registerSchema),
//   });
//   const { post } = useApi();
//   const [apiError, setApiError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const onSubmit = async (data) => {
//     try {
//       const response = await post("https://v2.api.noroff.dev/auth/register", data);
//       setSuccessMessage("Registration Successful");
//       setApiError("");
//     } catch (error) {
//       console.error("Registration Failed", error);
//       setApiError(error.message);
//       setSuccessMessage("");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <ModalOverlay onClick={onClose}>
//       <ModalContent onClick={(e) => e.stopPropagation()}>
//         <CloseIcon onClick={onClose} />
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <label htmlFor="name">Username</label>
//           <input id="name" {...register("name")} />
//           {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
//           <label htmlFor="email">Email</label>
//           <input id="email" {...register("email")} />
//           {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
//           <label htmlFor="password">Password</label>
//           <input id="password" type="password" {...register("password")} />
//           {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
//           <button type="submit">Register</button>
//           {apiError ? <ErrorMessage>{apiError}</ErrorMessage> : <SuccessMessage> {successMessage}</SuccessMessage>}
//           <p>
//             Already have an account?{" "}
//             <a href="#" onClick={switchToSignIn}>
//               Sign In
//             </a>
//           </p>
//         </form>
//       </ModalContent>
//     </ModalOverlay>
//   );
// }

// export default Register;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalOverlay, ModalContent, CloseIcon, ErrorMessage, SuccessMessage } from "../AuthModals.styles";
import useApi from "../../../hooks/useApi";

const registerSchema = yup
  .object({
    name: yup.string().min(3, "Username must be at least 3 characters long").required("Username is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
  })
  .required();

function Register({ isOpen, onClose, switchToSignIn }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { fetchApi } = useApi();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetchApi("https://v2.api.noroff.dev/auth/register", "POST", data);
      if (response) {
        setSuccessMessage("Registration Successful");
        setApiError("");
      }
    } catch (error) {
      console.error("Registration Failed", error);
      setApiError(error.message);
      setSuccessMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={onClose} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Username</label>
          <input id="name" {...register("name")} />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

          <label htmlFor="email">Email</label>
          <input id="email" {...register("email")} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          <button type="submit">Register</button>
          {apiError ? <ErrorMessage>{apiError}</ErrorMessage> : <SuccessMessage>{successMessage}</SuccessMessage>}

          <p>
            Already have an account?{" "}
            <a href="#" onClick={switchToSignIn}>
              Sign In
            </a>
          </p>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default Register;
