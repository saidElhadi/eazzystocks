"use client";
import React from "react";
import { UserAuth } from "../context/AuthContext";
import GainersLosers from "../gainers_and_loosers/page";

function page() {
  const { user } = UserAuth();
  return (
    <div>
      dashboard {user?.uid}
      <br />
      <GainersLosers isPreview={true} />
    </div>
  );
}

export default page;
