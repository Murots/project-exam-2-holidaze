import React, { useState, useEffect, useCallback } from "react";
import * as S from "./UserDropdownMenu.styles";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Represents a dropdown menu component for user interactions, tied to the authentication state.
 * It allows authenticated users to access quick links to manage their profile, bookings, venues, and sign out.
 * The dropdown's visibility is controlled by a toggle and it automatically hides when the user's mouse leaves the component.
 * It is designed to integrate seamlessly with the header, responding to hover states for improved user experience.
 *
 * @module UserDropdownMenu
 * @param {Object} props
 * @param {boolean} props.isHeaderHovered - Indicates if the header is hovered over, affecting the dropdown's styling.
 * @returns {React.Component} The UserDropdownMenu component which provides authenticated users with quick access to common functionalities.
 * @example
 * return (
 *   <UserDropdownMenu isHeaderHovered={headerHoverState} />
 * )
 */
const UserDropdownMenu = ({ isHeaderHovered }) => {
  const { logout, username, avatarUrl, venueManager } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOutRequest = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  useEffect(() => {
    window.addEventListener("requestSignOut", handleSignOutRequest);

    return () => {
      window.removeEventListener("requestSignOut", handleSignOutRequest);
    };
  }, [handleSignOutRequest]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <S.DropdownContainer onMouseLeave={closeDropdown}>
      <S.Button onClick={toggleDropdown} isHeaderHovered={isHeaderHovered}>
        {avatarUrl ? <S.Avatar src={avatarUrl} alt="User Avatar" /> : <S.IconUser size="20px" />}
        <S.Username>{username || "Guest"}</S.Username>
        <S.ChevronIcon isOpen={isOpen} />
      </S.Button>
      <S.DropdownContent className={isOpen ? "open" : ""}>
        {venueManager && (
          <>
            <S.DropdownItem to="/create-venue">Create Venue</S.DropdownItem>
            <S.DropdownItem to="/my-venues">My Venues</S.DropdownItem>
          </>
        )}
        <S.DropdownItem to="/my-bookings">My Bookings</S.DropdownItem>
        <S.DropdownItem to="/my-account">My Account</S.DropdownItem>
        <S.DropdownItem as="button" onClick={handleSignOutRequest}>
          Sign Out
        </S.DropdownItem>
      </S.DropdownContent>
    </S.DropdownContainer>
  );
};

export default UserDropdownMenu;
