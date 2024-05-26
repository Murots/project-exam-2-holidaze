import React from "react";
import * as S from "./NavLinks.styles";

/**
 * Component for rendering navigation links. This component displays links to the Home and Contact pages.
 * It receives a callback function `onClose` that is called when a link is clicked, closing the mobile navigation menu.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to call when a link is clicked
 * @returns {React.Element} The rendered element with navigation links
 *
 * @example
 * <NavLinks onClose={() => console.log('Navigating away...')} />
 */
const NavLinks = ({ onClose, isOpen, isHeaderHovered }) => {
  // Handling mouse leave event
  const handleMouseLeave = () => {
    if (window.innerWidth <= 768) {
      // Check if the screen width is 768px or less
      onClose(); // Close the navigation menu
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
