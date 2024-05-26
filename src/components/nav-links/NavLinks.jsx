import React from "react";
import * as S from "./NavLinks.styles";

/**
 * Represents a navigation component that renders links to the header.
 * It includes functionality to automatically close the navigation menu when a link is clicked or when the mouse leaves the menu area on smaller screens.
 * This component adapts its behavior based on whether the header is hovered over and the current screen width.
 *
 * @module NavLinks
 * @param {Object} props
 * @param {Function} props.onClose - Function to call when the navigation menu should be closed.
 * @param {boolean} props.isOpen - State indicating whether the navigation menu is open.
 * @param {boolean} props.isHeaderHovered - State indicating whether the header is being hovered over, affecting link styling.
 * @returns {React.Component} The NavLinks component which provides links for navigation within the site.
 * @example
 * return (
 *   <NavLinks onClose={handleClose} isOpen={menuOpen} isHeaderHovered={headerHovered} />
 * )
 */
const NavLinks = ({ onClose, isOpen, isHeaderHovered }) => {
  const handleMouseLeave = () => {
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <S.NavContainer isOpen={isOpen} onMouseLeave={handleMouseLeave}>
      <S.StyledLinkHome to="/" onClick={onClose} isHovered={isHeaderHovered}>
        Home
      </S.StyledLinkHome>
      <S.StyledLink to="/venues" onClick={onClose} isHovered={isHeaderHovered}>
        Venues
      </S.StyledLink>
    </S.NavContainer>
  );
};

export default NavLinks;
