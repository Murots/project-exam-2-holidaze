import styled from "styled-components";

export const Container = styled.footer`
  background-color: #6c2630;
  padding: 20px;
  text-align: center;
  position: relative;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding-bottom: 50px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 16px;
    background-image: url("/images/mountains-icon_red.png");
    background-repeat: repeat-x;
    background-position: center;
    margin-top: 5px;
    background-color: black;
    border-top: 3px solid black;
  }
`;

export const Section = styled.div`
  margin: 10px;
  flex: 1;
`;

export const Title = styled.h3`
  margin-bottom: 10px;
`;

export const Icons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const IconLink = styled.a`
  color: white;
  font-size: 24px;
  transition: color 0.3s;

  &:hover {
    color: #a8a8a8;
  }
`;

export const ContactInfo = styled.p`
  font-size: 14px;
`;

export const Link = styled.a`
  display: block;
  color: white;
  text-decoration: none;
  margin: 5px 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const CopyRight = styled.p`
  position: absolute;
  bottom: 0px;
  width: 100%;
  text-align: center;
  font-size: 12px;
`;
