"use client";
import { ThemeProvider, createGlobalStyle } from "styled-components";

export const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-LightItalic.ttf') format('truetype');
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-BlackItalic.ttf') format('truetype');
    font-weight: 900;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-BoldItalic.ttf') format('truetype');
    font-weight: 700;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-Italic.ttf') format('truetype');
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-MediumItalic.ttf') format('truetype');
    font-weight: 500;
    font-style: italic;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-Thin.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src: url('/font/Roboto-ThinItalic.ttf') format('truetype');
    font-weight: 100;
    font-style: italic;
  }
  body {
    font-family: 'Roboto', Arial, sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;
export const sizes = {
  xs: "50px",
  sm: "75px",
  md: "125px",
  lg: "175px",
  xl: "225px",
  xxl: "300px",
  xxl1: "500px",
  xxl2: "600px",
  xxl3: "700px",
  full: "100%",
};
const radiuses = {
  default: "10px",
  xs: "5px",
  sm: "10px",
  md: "15px",
  lg: "20px",
  xl: "25px",
  xxl: "30px",
  xxl1: "35px",
  xxl2: "40px",
  xxl3: "45px",
  full: "50%",
};
export const pallet = {
  primary: {
    100: "#a476ef",
    200: "#8B50EB",
    300: "#7231DC",
    400: "#5D20BF",
    500: "#4F15AC",
    600: "#400D93",
    700: "#310775",
    800: "#210451",
    900: "#13012F",
  },
  neutral: {
    0: "#FFFFFF",
    100: "#F5F7FA",
    200: "#E4E7EB",
    300: "#CBD2D9",
    400: "#9AA5B1",
    500: "#7B8794",
    600: "#616E7C",
    700: "#52606D",
    800: "#3E4C59",
    900: "#323F4B",
    1000: "#1C1C1C",
  },
  green: {
    100: "#75F07C",
    200: "#5CEA6C",
    300: "#3FE05C",
    400: "#2AD24E",
    500: "#1DCB44",
    600: "#0FC23A",
    700: "#00B52F",
    800: "#00A22A",
    900: "#008B24",
  },
  red: {
    100: "#F14C4C",
    200: "#E43F3F",
    300: "#D53232",
    400: "#C42525",
    500: "#B21A1A",
    600: "#9F1010",
    700: "#8B0606",
    800: "#770000",
    900: "#620000",
  },
  blue: {
    100: "#4C62F1",
    200: "#3F53E4",
    300: "#323ED5",
    400: "#2529C6",
    500: "#1A1AB2",
    600: "#10109F",
    700: "#06008B",
    800: "#000077",
    900: "#000062",
  },
};
export const theme = {
  colors: {
    pallet,
    // Additional colors for UI/UX elements:
    background: pallet.neutral[100],
    border: pallet.neutral[600],
    text_light: pallet.neutral[300],
    text: pallet.neutral[500],
    text_dark: pallet.neutral[800],
    card: {
      background: pallet.neutral[0],
      border: pallet.neutral[600],
    },
    button: {
      default: pallet.primary[500],
      hover: pallet.primary[400],
      active: pallet.primary[600],
      disabled: pallet.neutral[500],
      text: pallet.neutral[100],
    },
    secondary_button: {
      default: pallet.neutral[300],
      hover: pallet.neutral[400],
      active: pallet.neutral[500],
      disabled: pallet.neutral[200],
      text: pallet.neutral[900],
    },
    input: {
      background: pallet.neutral[100],
      border: pallet.neutral[600],
      focus: pallet.primary[500],
      placeholder: pallet.neutral[500],
    },
    input_with_button: {
      background: pallet.neutral[100],
      border: pallet.primary[500],
      button: {
        default: pallet.blue[500],
        hover: pallet.blue[400],
        active: pallet.blue[600],
      },
    },
  },
  units: {
    radius: radiuses,
    size: sizes,
  },
  fonts: {
    primary: "Roboto",
  },
};
