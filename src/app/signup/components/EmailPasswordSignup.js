"use client";
import React, { useRef } from "react";
import { Card, Container } from "./styledComponents";

const EmailPasswordLogin = ({ onLogin, showPhone, setShowPhone, setErrorMessages }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const displayNameRef = useRef(null);

  // handle password confirmation
  const handlePasswordConfirm = () => {
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    if (password !== passwordConfirm) {
      // set error message
      setErrorMessages(() => ["Passwords do not match"]);
    }
    if (password === passwordConfirm) {
      // set error message
      setErrorMessages(() => [" "]);
    }

  };


  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = displayNameRef.current.value;
       
    onLogin(email, password, name);
  };


  return (
    <Card show={(!showPhone).toString()}>
      <input ref={displayNameRef} type="name" placeholder="Username" />
      <input ref={emailRef} type="text" placeholder="Email" />
      
      <input ref={passwordRef} type="password" placeholder="Password" />
      <input ref={passwordConfirmRef} type="password" placeholder="Confirm Password" onChange={handlePasswordConfirm} />

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
