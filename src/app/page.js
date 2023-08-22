"use client";
import { LogoText, Theme, theme } from "./styledTheme";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { User } from "@/lib/User";
export default function Home({children}) {
  const router = useRouter();
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    });
    return () => unsub();
  }, []);


  const { logOut, user } = UserAuth();

  return (
    <div>
      <div>
        <>EazzyStocks</>
        loged in as {user?.uid}
        <button
          onClick={() => {
            logOut();
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
}
