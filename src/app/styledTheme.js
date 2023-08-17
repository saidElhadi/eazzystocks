"use client";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { styled } from "styled-components";
import { Roboto_Flex } from "next/font/google";

export const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export const GlobalStyle = createGlobalStyle`
  @font-face {font-family: 'Roboto';src:url('/Roboto-Regular.tff') format('ttf');}
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;
export const theme = {
  colors: {
    background: "#F9F7F7",
    primary: "#112D4E",
    primary_dark: "#112D4E",
    primary_light: "#3F72AF",
    secondary_coral: "#F4A261",
    secondary_bright_blue: "#3DB2FF",
    secondary_teal: "#48E5C2",
    highlight: "#FFC75F",
    dark_shade: "#1B262C",
    light_shade: "#d1d9e6",
    // Additional colors for UI/UX elements:
    button: {
      default: "#3F72AF",
      hover: "#2C5984",
      active: "#234769",
      disabled: "#B0C6DE",
      text: "#FFFFFF",
    },
    secondary_button: {
      default: "#D9E2EC",
      hover: "#B7CCE2",
      active: "#96ADC8",
      disabled: "#E7EAF0",
      text: "#1B262C",
    },
    input: {
      background: "#FFFFFF",
      border: "#989da5",
      focus: "#3F72AF",
      placeholder: "#AAB7C4",
    },
    input_with_button: {
      background: "#FFFFFF",
      border: "#3F72AF",
      button: {
        default: "#3DB2FF",
        hover: "#2A9AD2",
        active: "#2080B9",
      },
    },
    card: {
      background: "#F9F7F7",
      border: "#D1D9E6",
    },
    modal: {
      background: "#FFFFFF",
      border: "#D1D9E6",
    },
  },
  fonts: {
    primary: "Roboto",
  },
};
