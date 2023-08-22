"use client";
import { getFinancialAsset } from "@/lib/FinancialAsset";
import React, { useEffect, useRef, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { getNewsBySymbol, useCompanyOverview } from "@/lib/getDataFromAPI";
import { User } from "@/lib/User";

const page = ({ params, userObj }) => {
  const checkRef = useRef(null);
  const checkTrackRef = useRef();
  const { user } = UserAuth();

  let stock = user?.getItemFromWatchlist(params.symbol);
  console.log(stock)
  if (stock == null) {
    console.log("stuck null init obj")
    stock = getFinancialAsset(params.symbol, "stock");
  }

  const { data, isError, isLoading } = useCompanyOverview(stock.symbol);
  const {
    data: news,
    isError: newsError,
    isLoading: newsLoading,
  } = getNewsBySymbol(stock.symbol);

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
                if (checkTrackRef.current.checked) {
                  console.log("checked");
                  stock.updateTracker()
                  user.addToWatchlist(stock.toWatchlist());

                } else {
                  console.log("unchecked");
                  stock.resetTracker();
                  user.addToWatchlist(stock.toWatchlist());
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
