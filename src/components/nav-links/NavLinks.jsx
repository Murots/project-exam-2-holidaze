import React from "react";
import * as S from "./NavLinks.styles";

/**
 * Component for rendering navigation links. This component displays links to the Home and Contact pages.
 * It receives a callback function `onClose` that is called when a link is clicked, closing mobile navigation menu.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to call when a link is clicked
 * @returns {React.Element} The rendered element with navigation links
 *
 * @example
 * <NavLinks onClose={() => console.log('Navigating away...')} />
 */
const NavLinks = ({ onClose, isOpen, isHeaderHovered }) => {
  return (
    <S.NavContainer isOpen={isOpen}>
      <S.StyledLink to="/venues" onClick={onClose} isHovered={isHeaderHovered}>
        Venues
      </S.StyledLink>
      <S.StyledLink to="/contact" onClick={onClose} isHovered={isHeaderHovered}>
        Contact
      </S.StyledLink>
    </S.NavContainer>
  );
};

export default NavLinks;
