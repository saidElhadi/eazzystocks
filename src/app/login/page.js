"use client";
import { auth } from "@/firebase/config";
import {
  RecaptchaVerifier,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect, use } from "react";
import {
  Card,
  Container,
  InputWithButton,
} from "./components/styledComponents";
import Link from "next/link";
import EmailPasswordLogin from "./components/EmailPasswordLogin";
import PhoneOtcLogin from "./components/PhoneOtcLogin";

function page() {
  const router = useRouter();
  const [showPhone, setShowPhone] = useState(false);
  const [errorMessages, setErrorMessages] = useState([" "]);
  const clearErrors = () => setErrorMessages([" "]);
  const ErrorMessages = () => {
    return (
      <div>
        {errorMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    );
  };

  const handleLoginEmail = async (email, password) => {
    clearErrors();
    console.log("Login with email and password", email, password);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMessages([error.message]);
    }
  };
  const handleLoginPhone = (code) => {
    clearErrors();
    console.log("Login with code", code);
    try {
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          const user = result.user;
        })
        .catch((error) => {
          setErrorMessages([error.message]);
        });
    } catch (error) {
      setErrorMessages([error.message]);
    }
  };
  const sendCode = (phone) => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recapcha", {
      size: "invisible",
      callback: (response) => {
        console.log("success");
      },
      "expired-callback": (response) => {
        console.log("expired");
        setErrorMessages((prevErrors) => [
          ...prevErrors,
          "expired",
          response.message,
        ]);
      },
    });
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessages([error.message]);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        clearErrors();
        router.push("/dashboard");
      } else {
        console.log("no user");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Container>
      <h1>Login</h1>
      <EmailPasswordLogin
        onLogin={handleLoginEmail}
        showPhone={showPhone}
        setShowPhone={setShowPhone}
      />
      <PhoneOtcLogin
        onSendCode={sendCode}
        onLoginWithCode={handleLoginPhone}
        showPhone={showPhone}
        setShowPhone={setShowPhone}
      />
      <ErrorMessages />
      <p>
        Don't have an account? <Link href={"/signup"}>Sign up!</Link>
      </p>
      <div id="recapcha"></div>
    </Container>
  );
}

export default page;
