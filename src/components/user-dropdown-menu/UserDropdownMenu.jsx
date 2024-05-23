import React, { useState, useEffect, useCallback } from "react";
import * as S from "./UserDropdownMenu.styles";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
