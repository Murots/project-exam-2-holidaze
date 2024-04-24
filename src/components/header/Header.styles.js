import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background-color: transparent;
  position: fixed;
  width: 100%;
  z-index: 1000;
  transition: transform 0.2s, background-color 0.5s;

  &:hover {
    background-color: white;
  }

  @media (max-width: 768px) {
    background-color: white;
  }
`;

export const Hamburger = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const StyledSignIn = styled(Link)`
  text-decoration: none;
  transition: color 0.2s, transform 0.2s, background-color 0.2s;
  color: ${(props) => (props.isHeaderHovered ? "black" : "white")};
  font-weight: 600;
  text-transform: uppercase;
  position: relative;

  &:hover {
    transform: scale(1.05);
    text-decoration: none;
    color: #5b1a24;
  }

  @media (max-width: 768px) {
    color: black;
  }
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  height: 40px;
  width: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: translateX(-50%) scale(1.05);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
