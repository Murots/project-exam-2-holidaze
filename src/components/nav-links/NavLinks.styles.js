import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  background-color: transparent;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #e9ecef;
    padding: 10px 20px;
    z-index: 10;
    overflow: hidden;
    transition: all 0.3s ease; // Adjust duration as needed
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  }
`;

export const StyledLink = styled(({ isHovered, ...props }) => <Link {...props} />)`
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
  color: ${({ isHovered }) => (isHovered ? "black" : "white")};
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
    margin-right: 0;
  }
`;

export const StyledLinkHome = styled(({ isHovered, ...props }) => <Link {...props} />)`
  display: none;
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
  color: ${({ isHovered }) => (isHovered ? "black" : "white")};
  font-weight: 600;

  &:hover {
    transform: scale(1.05);
    color: #5b1a24;
  }

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 20px;
    margin-top: 15px;
  }
`;
