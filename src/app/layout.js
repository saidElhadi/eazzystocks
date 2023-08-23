"use client";
import StyledComponentsRegistry from "@/lib/registery";
import { GlobalStyle, Theme } from "./styledTheme";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "@/lib/Navbar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <AuthContextProvider>
            <Theme>
              <GlobalStyle />
              <Navbar />
              {children}
            </Theme>
          </AuthContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
