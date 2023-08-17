"use client";
import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 101;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;

// card that contains the login form
export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  height: 400px;
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  z-index: 102;
  input {
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.card};

    &::placeholder {
      color: ${(props) => props.theme.colors.text};
    }
  }
  button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.button.text};
    background-color: ${(props) => props.theme.colors.button.default};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: ${(props) => props.theme.colors.button.hover};
    }
    &:active {
      background-color: ${(props) => props.theme.colors.button.active};
    }
  }
  p {
    font-size: 0.8rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
    margin: 10px 0;
    a {
      color: ${(props) => props.theme.colors.primary};
      text-decoration: underline;
      &:hover {
        color: ${(props) => props.theme.colors.primary_dark};
      }
    }
  }
`;

// input that has a button for code verification
export const InputWithButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: 600;

    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) =>
      props.theme.colors.input_with_button.background};

    &::placeholder {
      color: ${(props) => props.theme.colors.text};
    }
    
  }
  button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.button.text};
    background-color: ${(props) =>
      props.theme.colors.input_with_button.button.default};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.input_with_button.button.hover};
    }
    &:active {
      background-color: ${(props) =>
        props.theme.colors.input_with_button.button.active};
    }
    &:disabled {
      background-color: ${(props) =>
        props.theme.colors.button.disabled};
    }
  }
`;
