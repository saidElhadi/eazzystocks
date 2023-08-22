"use client";
import { getFinancialAsset } from "@/lib/FinancialAsset";
import React, { useEffect, useRef, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { getNewsBySymbol, useCompanyOverview } from "@/lib/getDataFromAPI";
import { User } from "@/lib/User";

const page = ({ params, userObj }) => {
  const checkRef = useRef();
  const checkTrackRef = useRef();
  const { user } = UserAuth();

  let stock = user.getItemFromWatchlist(params.symbol);
  console.log(stock)
  if (stock == null) {
    stock = getFinancialAsset(params.symbol, "stock");
  } else {
    console.log("stock found in watchlist");
  }

  // check if user has stock in watchlist

  const { data, isError, isLoading } = useCompanyOverview(stock.symbol);
  const {
    data: news,
    isError: newsError,
    isLoading: newsLoading,
  } = getNewsBySymbol(stock.symbol);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    if (news) {
    }
    return (
      <div>
        <>{data.Symbol}</>
        <h2>
          {data.Name}
          <input
            type="checkbox"
            ref={checkRef}
            onChange={() => {
              if (user?.uid) {
                if (checkRef.current.checked) {
                  console.log("checked");
                  user.addToWatchlist(stock);
                } else {
                  console.log("unchecked");
                  user.removeFromWatchlist(stock);
                }
              }
            }}
          ></input>
          <input
            type="checkbox"
            ref={checkTrackRef}
            onChange={() => {
              if (user?.uid) {
                if (checkRef.current.checked) {
                  console.log("checked");
                  stock.updateTracker();
                  user.addToWatchlist(stock);
                } else {
                  console.log("unchecked");
                  stock.resetTracker();
                  user.removeFromWatchlist(stock);
                }
              }
            }}
          ></input>
        </h2>
        <p>{data.Description}</p>
      </div>
    );
  }
};

export default page;
