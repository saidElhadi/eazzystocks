"use client";
import React, { useRef } from "react";
import { Card, Container } from "./styledComponents";

const EmailPasswordLogin = ({ onLogin, showPhone, setShowPhone }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    onLogin(email, password);
  };

  return (
    <Card show={(!showPhone).toString()}>
      <input ref={emailRef} type="text" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />

      <p>
        or login with your{" "}
        <a
          onClick={() => {
            setShowPhone(true);
          }}
        >
          phone number.
        </a>
      </p>
      <button onClick={handleLogin}>Login</button>
    </Card>
  );
};

export default EmailPasswordLogin;
