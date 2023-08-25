"use client";
import StyledComponentsRegistry from "@/lib/registery";
import { GlobalStyle, Theme } from "@/lib/styledTheme";
import { AuthContextProvider } from "@/lib/context/AuthContext";
import Navbar from "@/lib/navbar/Navbar";

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
