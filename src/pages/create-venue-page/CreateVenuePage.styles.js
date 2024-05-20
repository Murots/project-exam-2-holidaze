import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background: #fff;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
`;

export const Heading = styled.h1`
  text-align: center;
  margin-top: 100px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
`;

export const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  height: 10em;
`;

export const InlineGroup = styled.div`
  display: flex;
  gap: 50px;
`;

export const InlineLabel = styled.label`
  flex: 1;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 5px 5px 0 5px;
`;

export const SubmitButton = styled.button`
  padding: 12px;
  font-size: 16px;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 auto 50px auto;
  width: 250px;

  &:hover {
    background-color: #45a049;
  }
`;

export const ImagePreview = styled.img`
  display: block;
  margin: 5px auto;
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const CheckboxGroup = styled.div`
  display: block;
  margin-bottom: 20px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: black;
  margin-top: 5px;
`;
