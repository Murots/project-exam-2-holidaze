import styled from "styled-components";

export const FullScreenBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("/images/north-compressed.jpg");
  background-size: cover;
  background-position: center 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const HomePageHeading = styled.h1`
  color: white;
  font-size: 2.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 20px;
  white-space: nowrap;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StylishWord1 = styled.span`
  font-family: "Playfair Display", Verdana, Geneva, Tahoma;
`;

export const StylishWord2 = styled.span`
  font-family: "Pacifico", Verdana, Geneva, Tahoma;
  margin: 0 5px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  width: 80%;
  font-size: 1rem;
  margin-top: 20px;
  border-radius: 5px;
  border: 2px solid #ddd;
  &:focus {
    border-color: #0056b3;
    outline: none;
  }

  @media (min-width: 700px) {
    width: 60%;
  }

  @media (min-width: 1000px) {
    width: 40%;
  }
`;

export const ResultsDropdown = styled.div`
  position: absolute;
  top: 100%; 
  width: 80%; 
  max-height: 280px; 
  background: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 20;
  overflow-y: auto; 
  border-radius: 4px; 
  overflow-x: hidden; 

  @media (min-width: 700px) {
    width: 60%;
  }

  @media (min-width: 1000px) {
    width: 40%;
`;

export const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

export const ResultName = styled.span`
  font-size: 1.1rem;
  color: #333;
`;

export const ResultImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px 0;
`;

export const ResultDetail = styled.span`
  font-size: 0.9rem;
  color: #666;
`;
