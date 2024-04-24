import styled from "styled-components";

export const FullScreenBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("/images/north-compressed.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const HomePageHeading = styled.h1`
  color: white;
  font-size: 2rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  z-index: 10;
`;
