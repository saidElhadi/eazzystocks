"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserAuth } from "@/lib/context/AuthContext";
import Preview from "./components/Preview";
import Page from "./components/Page";

const WatchList = ({ isPreview }) => {
  const { user } = UserAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [news, setNews] = useState([]); 
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  if (isPreview) {
    return (
      <Preview></Preview>
      );
  }
  if (!isPreview) {
    return <Page/>;
  }
};

export default WatchList;

