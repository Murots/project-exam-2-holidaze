// import React, { useState, useContext } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { ModalOverlay, ModalContent, CloseIcon, ErrorMessage, SuccessMessage } from "../AuthModals.styles";
// import useApi from "../../../hooks/useApi";
// import { useNavigate } from "react-router-dom";

// const signInSchema = yup.object({
//   email: yup.string().email("Invalid email format").required("Email is required"),
//   password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
// }).required();

// function SignIn({ isOpen, onClose, switchToRegister }) {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(signInSchema),
//   });
//   const { post } = useApi();
//   const [apiError, setApiError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const response = await post("https://v2.api.noroff.dev/auth/login", data);
//       if (response.data.accessToken) {
//         sessionStorage.setItem("accessToken", response.data.accessToken);
//         setSuccessMessage("Login successful");
//         setApiError("");

//         const apiKeyResponse = await post("https://v2.api.noroff.dev/auth/create-api-key");
//         sessionStorage.setItem("apiKey", apiKeyResponse.data.key);

//         navigate("/dashboard");
//       } else {
//         setApiError("Failed to obtain access token");
//       }
//     } catch (error) {
//       console.error("Login Failed", error);
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
//           <label htmlFor="email">Email</label>
//           <input id="email" {...register("email")} />
//           {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

//           <label htmlFor="password">Password</label>
//           <input id="password" type="password" {...register("password")} />
//           {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

//           <button type="submit">Sign In</button>
//           {apiError ? <ErrorMessage>{apiError}</ErrorMessage> : <SuccessMessage>{successMessage}</SuccessMessage>}
//           <p>
//             Not registered?{" "}
//             <a href="#" onClick={switchToRegister}>
//               Create an account
//             </a>
//           </p>
//         </form>
//       </ModalContent>
//     </ModalOverlay>
//   );
// }

// export default SignIn;

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { ModalOverlay, ModalContent, CloseIcon, ErrorMessage } from "../AuthModals.styles";
// import useApi from "../../../hooks/useApi";

// const signInSchema = yup
//   .object({
//     email: yup.string().email("Invalid email format").required("Email is required"),
//     password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
//   })
//   .required();

// function SignIn({ isOpen, onClose, switchToRegister }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(signInSchema),
//   });
//   const { fetchApi } = useApi();
//   const [apiError, setApiError] = useState("");

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetchApi("https://v2.api.noroff.dev/auth/login", "POST", data);
//       if (response.data && response.data.accessToken) {
//         sessionStorage.setItem("accessToken", response.data.accessToken);
//         onClose();
//       } else {
//         setApiError("Failed to obtain access token");
//       }
//     } catch (error) {
//       console.error("Login Failed", error);
//       setApiError(error.message);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <ModalOverlay onClick={onClose}>
//       <ModalContent onClick={(e) => e.stopPropagation()}>
//         <CloseIcon onClick={onClose} />
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <label htmlFor="email">Email</label>
//           <input id="email" {...register("email")} />
//           {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

//           <label htmlFor="password">Password</label>
//           <input id="password" type="password" {...register("password")} />
//           {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

//           <button type="submit">Sign In</button>
//           {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
//           <p>
//             Not registered?{" "}
//             <a href="#" onClick={switchToRegister}>
//               Create an account
//             </a>
//           </p>
//         </form>
//       </ModalContent>
//     </ModalOverlay>
//   );
// }

// export default SignIn;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalOverlay, ModalContent, CloseIcon, ErrorMessage } from "../AuthModals.styles";
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
      const response = await fetchApi("https://v2.api.noroff.dev/auth/login", "POST", data);
      if (response.data && response.data.accessToken) {
        login(response.data);
        onClose();
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
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          <button type="submit">Sign In</button>
          {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
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
