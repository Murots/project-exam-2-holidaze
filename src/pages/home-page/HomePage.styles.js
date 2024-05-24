import styled from "styled-components";

export const FullScreenBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("/images/north5-compressed.jpg");
  background-size: cover;
  background-position: center 0%;
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
  flex-direction: row; // Default to row
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  margin: -80px 0 0 -25px;

  @media (max-width: 550px) {
    flex-direction: column; // Stack the text vertically on small screens
  }
`;

export const StylishWord1 = styled.span`
  font-family: "Playfair Display", Verdana, Geneva, Tahoma;
`;

export const StylishWord2 = styled.span`
  font-family: "Pacifico", Verdana, Geneva, Tahoma;
  margin: 0 5px; // Maintain horizontal spacing for larger screens
  font-weight: 400;

  @media (max-width: 550px) {
    display: block; // Ensure full width usage
    margin: 0; // Remove horizontal margins on small screens
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchInput = styled.input`
  padding: 10px;
  width: 80%;
  font-size: 1rem;
  margin-top: 20px;
  border-radius: 5px;
  border: 2px solid #ddd;
  margin-left: -25px;
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
  margin-left: -25px;
  margin-top: 5px;

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
