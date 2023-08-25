"use client";
import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.pallet.neutral[100]};
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
  background-color: ${(props) => props.theme.colors.card.background};
  border-radius: 25px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  height: 300px;
  display: ${(props) => (props.show == 'true' ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  z-index: 102;
  input {
    margin: 10px 0;
    padding: 10px;
    text-align: center;
    border: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.pallet.neutral[800]};
    background-color: ${(props) => props.theme.colors.input.background};

    &::placeholder {
      color: ${(props) => props.theme.colors.pallet.neutral[800]};
    }
  }
  button {
    padding: 10px;
    border-radius: 25px;
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
    color: ${(props) => props.theme.colors.pallet.neutral[800]};
    margin: 10px 0;
    a {
      color: ${(props) => props.theme.colors.pallet.primary};
      text-decoration: underline;
      &:hover {
        color: ${(props) => props.theme.colors.pallet.neutral[900]};
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

    color: ${(props) => props.theme.colors.pallet.neutral[800]};
    background-color: ${(props) =>
      props.theme.colors.input_with_button.background};

    &::placeholder {
      color: ${(props) => props.theme.colors.pallet.neutral[800]};
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
export const SelectedCountryCode = styled.div`
  position: relative;
  width: 0;
  align-self: center;
  color: ${(props) => props.theme.colors.pallet.neutral[800]};
  &::placeholder {
    color: ${(props) => props.theme.colors.pallet.neutral[800]};
  }
`;
