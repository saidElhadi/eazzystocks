// 'use client'
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Container,
  InputWithButton,
  SelectedCountryCode,
} from "./styledComponents";
import { styled } from "styled-components";
import { CountryCodeSelect } from "./CountryCodeSelect";
const PhoneOtcLogin = ({
  onSendCode,
  handleLoginCodeConfirmation,
  showPhone,
  setShowPhone,
}) => {
  const phoneRef = useRef(null);
  const codeRef = useRef(null);
  const displayNameRef = useRef(null);
  const [codeSent, setCodeSent] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [phoneValid, setPhoneValid] = useState(true);
  const [codeValid, setCodeValid] = useState(true);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);

  const validatePhone = (phone) => {
    return phone.length > 9;
  };

  const validateCode = (code) => {
    return code.length === 6;
  };

  const handleSendCode = () => {
    const phone = selectedCountryCode + phoneRef.current.value;
    if (validatePhone(phone)) {
      onSendCode(phone);
      setCodeSent(true);
      setSeconds(60);
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  };

  const handleLogin = () => {
    const code = codeRef.current.value;
    if (validateCode(code)) {
      handleLoginCodeConfirmation(code);
      setCodeValid(true);
    } else {
      setCodeValid(false);
    }
  };

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  }, [seconds]);
  useEffect(() => {
    console.log(selectedCountryCode);
  }, [selectedCountryCode]);
  return (
    <Card show={showPhone.toString()}>
      <input ref={displayNameRef} type="name" placeholder="Username" />
      <InputWithButton>
        <CountryCodeSelect
          setSelectedCountryCode={(selectedCountryCode, setSelectedCountryCode)}
        />
        <SelectedCountryCode>{selectedCountryCode}</SelectedCountryCode>
        <input
          ref={phoneRef}
          type="text"
          placeholder="Phone Number"
          style={{
            paddingLeft: "40px",
            border: phoneValid ? "1px" : "1px solid red",
          }}
          onChange={() => setPhoneValid(true)}
        />
      </InputWithButton>

      <InputWithButton>
        <input
          ref={codeRef}
          type="text"
          placeholder="Code"
          style={{ border: codeValid ? "none" : "2px solid red" }}
          onChange={() => setCodeValid(true)}
        />
        <button onClick={handleSendCode} disabled={seconds > 0}>
          {codeSent ? `Code sent ${seconds}` : "Send Code"}
        </button>
      </InputWithButton>

      <p>
        or login with your{" "}
        <a
          onClick={() => {
            setShowPhone(false);
          }}
        >
          email.
        </a>
      </p>
      <button onClick={handleLogin}>Login</button>
    </Card>
  );
};

export default PhoneOtcLogin;
