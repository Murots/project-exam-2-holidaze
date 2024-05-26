import React, { useState, useEffect } from "react";
import * as S from "./Header.styles";
import { RxHamburgerMenu } from "react-icons/rx";
import NavLinks from "../nav-links/NavLinks";
import SignIn from "../auth-modals/sign-in/SignIn";
import Register from "../auth-modals/register/Register";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import UserDropdownMenu from "../user-dropdown-menu/UserDropdownMenu";

/**
 * Represents the main header component of the application, which includes navigation links, logo display, and signed in user options based on authentication level. The header's appearance and functionality adjust
 * It provides interactive elements such as a hamburger menu for mobile views, logo interactions, and modal triggers for sign-in or registration processes.
 * Authenticated users can access a dropdown menu for more user-specific options.
 *
 * @module Header
 * @returns {React.Component} The Header component, which adapts to display user authentication state and navigation.
 * @example
 * return (
 *   <Header />
 * )
 */
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [formType, setFormType] = useState("signin");
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const backgroundColor = location.pathname === "/" ? "transparent" : "#5B1A24";

  const handleAuthModalOpen = () => {
    setFormType("signin");
    setAuthModalOpen(true);
  };

  const switchForm = (type) => {
    setFormType(type);
  };

  const handleToggleOpen = () => setIsOpen(!isOpen);
  const handleMouseEnter = () => setIsHeaderHovered(true);
  const handleMouseLeave = () => setIsHeaderHovered(false);
  const handleLogoMouseEnter = () => setIsLogoHovered(true);
  const handleLogoMouseLeave = () => setIsLogoHovered(false);
  const handleCloseModal = () => setAuthModalOpen(false);
  const handleSignIn = () => switchForm("signin");
  const handleRegister = () => switchForm("register");

  useEffect(() => {
    const handleSignInRequest = () => {
      if (!isAuthenticated) {
        handleAuthModalOpen();
      }
    };

    window.addEventListener("requestSignIn", handleSignInRequest);

    return () => {
      window.removeEventListener("requestSignIn", handleSignInRequest);
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <S.Container backgroundColor={backgroundColor} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <S.Hamburger onClick={handleToggleOpen}>
          <RxHamburgerMenu size="1.5em" />
        </S.Hamburger>
        <NavLinks onClose={handleToggleOpen} isOpen={isOpen} isHeaderHovered={isHeaderHovered} />
        <S.LogoWrapper to="/">
          <S.Logo
            src={isLogoHovered ? "/images/logo-dark_red.png" : isHeaderHovered ? "/images/logo.png" : "/images/logo-white.png"}
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
            alt="Holidaze Logo"
          />
        </S.LogoWrapper>
        <S.StyledSignIn onClick={handleAuthModalOpen} isHeaderHovered={isHeaderHovered}>
          Sign in
        </S.StyledSignIn>
        {formType === "signin" ? (
          <SignIn isOpen={authModalOpen} onClose={handleCloseModal} switchToRegister={handleRegister} />
        ) : (
          <Register isOpen={authModalOpen} onClose={handleCloseModal} switchToSignIn={handleSignIn} />
        )}
      </S.Container>
    );
  } else {
    return (
      <S.Container backgroundColor={backgroundColor} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <S.Hamburger onClick={handleToggleOpen}>
          <RxHamburgerMenu size="1.5em" />
        </S.Hamburger>
        <NavLinks onClose={handleToggleOpen} isOpen={isOpen} isHeaderHovered={isHeaderHovered} />
        <S.LogoWrapper to="/">
          <S.Logo
            src={isLogoHovered ? "/images/logo-dark_red.png" : isHeaderHovered ? "/images/logo.png" : "/images/logo-white.png"}
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
            alt="Holidaze Logo"
          />
        </S.LogoWrapper>
        <UserDropdownMenu isHeaderHovered={isHeaderHovered} />
      </S.Container>
    );
  }
}

export default Header;
