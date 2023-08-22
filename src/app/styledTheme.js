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
    background: "#EDF4FB",
    text: "#1B262C",
    text_light: "#3F72AF",
    text_dark: "#0F1A2F",
    primary: "#101836",
    primary_dark: "#09193F",
    primary_light: "#0063F7",
    light_shade: "#d1d9e6",
    green: "#00C48C",
    dark_green: "#009E7F",
    red: "#FF3C38",
    dark_red: "#E12D39",
    grey: "#AAB7C4",
    white: "#FFFFFF",
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
      background: "#FFFFFF",
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
