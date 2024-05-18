import React, { useState } from "react";
import * as S from "./UserDropdownMenu.styles";
import { useAuth } from "../../contexts/AuthContext";

const UserDropdownMenu = ({ isHeaderHovered }) => {
  const { logout, username } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <S.DropdownContainer onMouseLeave={closeDropdown}>
      <S.Button onClick={toggleDropdown} isHeaderHovered={isHeaderHovered}>
        <S.IconUser size="20px" />
        <S.Username>{username || "Guest"}</S.Username>
        <S.ChevronIcon isOpen={isOpen} />
      </S.Button>
      <S.DropdownContent className={isOpen ? "open" : ""}>
        <S.DropdownItem to="/my-bookings">My Bookings</S.DropdownItem>
        <S.DropdownItem to="/my-account">My Account</S.DropdownItem>
        <S.DropdownItem as="button" onClick={logout}>
          Sign Out
        </S.DropdownItem>
      </S.DropdownContent>
    </S.DropdownContainer>
  );
};

export default UserDropdownMenu;
