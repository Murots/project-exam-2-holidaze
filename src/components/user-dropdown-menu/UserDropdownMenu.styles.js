import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { ChevronIconStyle as BaseChevronIcon } from "../../styles/GlobalStyles";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const Button = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.isHeaderHovered ? "black" : "white")};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 5px 10px;
  transition: color 0.2s;

  &:hover {
    color: #5b1a24;
  }

  @media (max-width: 768px) {
    color: black;
  }
`;

export const IconUser = styled(BsPersonCircle)`
  margin-right: 8px;
`;

export const Avatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const Username = styled.div`
  font-size: 16px;
  font-family: "Playfair Display", Verdana, Geneva, Tahoma;
  font-weight: 600;
`;

export const ChevronIcon = styled(BaseChevronIcon)`
  margin-left: 8px;
`;

export const DropdownContent = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
  padding-top: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
  top: 100%;
  max-height: 0;
  overflow: hidden;
  transition: all 0.8s ease;
  visibility: hidden;

  &.open {
    max-height: 270px;
    visibility: visible;
  }
`;

export const DropdownItem = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: right;
  width: 100%;
  background-color: white;
  border: none;
  font-size: 16px;
  font-family: "Playfair Display", Verdana, Geneva, Tahoma;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const ButtonItem = styled.button`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  width: 100%;
  background-color: none;
  border-width: none;

  &:hover {
    background-color: #f1f1f1;
  }
`;
