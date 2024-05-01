import React, { useState } from "react";
import * as S from "./Header.styles";
import { RxHamburgerMenu } from "react-icons/rx";
import NavLinks from "../nav-links/NavLinks";
import { useLocation } from "react-router-dom";

/**
 * Header component that provides navigation links and access to the shopping cart.
 * It includes a responsive hamburger menu for smaller screens that toggles navigation links displayed by the `NavLinks` component.
 * The `CartIcon` component is used to display and link to the shopping cart.
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const location = useLocation();

  const backgroundColor = location.pathname.startsWith("/venues") ? "#5B1A24" : "transparent";

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
      <S.StyledSignIn to="/checkout" isHeaderHovered={isHeaderHovered}>
        Sign in
      </S.StyledSignIn>
    </S.Container>
  );
}

export default Header;
