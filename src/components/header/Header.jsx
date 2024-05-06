import React, { useState } from "react";
import * as S from "./Header.styles";
import { RxHamburgerMenu } from "react-icons/rx";
import NavLinks from "../nav-links/NavLinks";
import SignIn from "../auth-modals/sign-in/SignIn";
import Register from "../auth-modals/register/Register";
import { useLocation } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [formType, setFormType] = useState("signin");
  const location = useLocation();

  const backgroundColor = location.pathname.startsWith("/venues") ? "#5B1A24" : "transparent";

  const handleAuthModalOpen = () => {
    setFormType("signin");
    setAuthModalOpen(true);
  };

  const switchForm = (type) => {
    setFormType(type);
  };

  return (
    <S.Container backgroundColor={backgroundColor} onMouseEnter={() => setIsHeaderHovered(true)} onMouseLeave={() => setIsHeaderHovered(false)}>
      <S.Hamburger onClick={() => setIsOpen(!isOpen)}>
        <RxHamburgerMenu size="1.5em" />
      </S.Hamburger>
      <NavLinks onClose={() => setIsOpen(false)} isOpen={isOpen} isHeaderHovered={isHeaderHovered} />
      <S.LogoWrapper to="/">
        <S.Logo
          src={isLogoHovered ? "/images/logo-dark_red.png" : isHeaderHovered ? "/images/logo.png" : "/images/logo-white.png"}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          alt="Holidaze Logo"
        />
      </S.LogoWrapper>
      <S.StyledSignIn onClick={handleAuthModalOpen} isHeaderHovered={isHeaderHovered}>
        Sign in
      </S.StyledSignIn>
      {formType === "signin" ? (
        <SignIn isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} switchToRegister={() => switchForm("register")} />
      ) : (
        <Register isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} switchToSignIn={() => switchForm("signin")} />
      )}
    </S.Container>
  );
}

export default Header;
