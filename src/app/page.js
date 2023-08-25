"use client";
import { LogoText, Theme, theme } from "../../lib/styledTheme";
import { AuthContextProvider, UserAuth } from "../../lib/context/AuthContext";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { User } from "@/lib/User";
import Dashboard from "@/lib/dashboard/page";
import Header from "@/lib/header/Header";
import { Container } from "@/lib/basic_components/container.styled";
export default function Home({ children }) {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsub();
  }, []);

  const { logOut, user } = UserAuth();

  return (
    <Container>
      <Header title={'Dashboard'}/>
      <Dashboard />
    </Container>
  );
}
