"use client";
import { firestore_db } from "@/firebase/config";
import {
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect, use } from "react";
import {
  Card,
  Container,
  InputWithButton,
} from "./components/styledComponents";
import Link from "next/link";
import EmailPasswordLogin from "./components/EmailPasswordSignup";
import PhoneOtcLogin from "./components/PhoneOtcSignup";
import { doc, setDoc } from "firebase/firestore";

function page() {
  const auth = getAuth();
  
  const router = useRouter();
  const [showPhone, setShowPhone] = useState(false);
  const [errorMessages, setErrorMessages] = useState([" "]);
  const clearErrors = () => setErrorMessages([" "]);
  const ErrorMessages = () => {
    return (
      <div>
        {errorMessages.map((message, index) => {
          return <p key={"error_msg_no: " + index}>{message}</p>;
        })}
      </div>
    );
  };

  const handleSignupEmail = async (email, password, userName) => {
    clearErrors();
    console.log("Login with email and password");
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // set up user collection
          const userRef = doc(firestore_db, "users", user.uid);
          const newUser = {
            displayName: userName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
            sign_up: new Date(),
            last_sign_in: new Date(),
            watchlist: [],
          };
          setDoc(userRef, newUser);
        })
        .then(() => {
          updateProfile(auth.currentUser, { displayName: userName });
        })
        .then(() => {
          router.push("/profile");
        })
        .catch((error) => {
          setErrorMessages([error.message]);
        });
    } catch (error) {
      setErrorMessages((prevErrors) => [...prevErrors, error.message]);
    }
  };
  const handleLoginCodeConfirmation = (code) => {
    clearErrors();
    console.log("Login with code", code);
    try {
      window.confirmationResult
        .confirm(code)
        .then((userCredential) => {
          const user = userCredential.user;
          // set up user collection
          const userRef = doc(firestore_db, "users", user.uid);
          const newUser = {
            displayName: userName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
            sign_up: new Date(),
            last_sign_in: new Date(),
            watchlist: [],
          };
          setDoc(userRef, newUser);
        })
        .then(() => {
          updateProfile(auth.currentUser, { displayName: userName });
        })
        .then(() => {
          router.push("/profile");
        })
        .catch((error) => {
          setErrorMessages((prevErrors) => [...prevErrors, error.message]);
        });
    } catch (error) {
      setErrorMessages((prevErrors) => [...prevErrors, error.message]);
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
        console.log(confirmationResult)
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessages((prevErrors) => [...prevErrors, error.message]);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        clearErrors();  
        console.log("user loged in -->", user);
      } else {
        console.log("no user");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Container>
      <h1>Signup</h1>
      <EmailPasswordLogin
        onLogin={handleSignupEmail}
        showPhone={showPhone}
        setShowPhone={setShowPhone}
        setErrorMessages={setErrorMessages}
      />
      <PhoneOtcLogin
        onSendCode={sendCode}
        handleLoginCodeConfirmation={handleLoginCodeConfirmation}
        showPhone={showPhone}
        setShowPhone={setShowPhone}
        setErrorMessages={setErrorMessages}
      />
      <ErrorMessages />
      <p>
        Already have an account? <Link href={"/login"}>Login!</Link>
      </p>
      <div id="recapcha"></div>
    </Container>
  );
}

export default page;
