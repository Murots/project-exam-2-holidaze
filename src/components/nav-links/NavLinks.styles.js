import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavContainer = styled.nav`
  display: flex; // Default to flex to allow inline on larger screens
  flex-direction: row; // Align items in a row on larger screens
  align-items: center; // Center items vertically
  position: relative; // Default position
  background-color: transparent; // Ensure it matches the header background on large screens

  @media (max-width: 768px) {
    flex-direction: column; // Stack vertically on smaller screens
    position: absolute; // Absolutely position to overlay content when menu is open
    top: 60px; // Start below the header area
    left: 0;
    right: 0;
    background-color: #e9ecef; // Visible menu background on smaller screens
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")}; // Only display when menu is toggled open
    padding: 10px 20px;
    z-index: 10; // Make sure it's on top of other content
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
  color: ${(props) => (props.isHovered ? "black" : "white")};
  font-weight: 600;
  margin-right: 20px;

  &:hover {
    transform: scale(1.05);
    color: #5b1a24;
  }

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
