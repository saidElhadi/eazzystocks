"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { UserAuth } from "@/lib/context/AuthContext";
import { User } from "@/lib/User";
import Preview from "./components/Preview";

const WatchList = ({ isPreview }) => {
  const { user } = UserAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [news, setNews] = useState([]); 
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  // const {user} = UserAuth();

  if (isPreview) {
    return (
      <Preview></Preview>
      );
  }
  if (!isPreview) {
    return <div>WatchList</div>;
  }
};

export default WatchList;

