"use client";
import { getFinancialAsset } from "@/lib/FinancialAsset";
import React, { use, useEffect, useRef, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { getNewsBySymbol, useCompanyOverview } from "@/lib/getDataFromAPI";
import { User } from "@/lib/User";
import ChartView from "@/lib/TimeSeriesChart";

const page = ({ params, userObj }) => {
  const checkRef = useRef(null);
  const checkTrackRef = useRef();
  const { user } = UserAuth();
  const [interval, setInterval] = useState('5min');

  const [stock, setStock] = useState(
    getFinancialAsset(params.symbol, "STOCK", undefined, undefined, undefined)
  );
  useEffect(() => {
    if (user?.uid) {
      let temp = user.getItemFromWatchlist(params.symbol);
      if (temp) {
        setStock(temp);
        if (checkRef.current) {
          checkRef.current.checked = true;
        }
        if (temp?.tracker) {
          if (checkTrackRef.current) {
            checkTrackRef.current.checked = true;
          }
        }
      }
    }
  }, [user]);

  const { data, isError, isLoading } = useCompanyOverview(stock.symbol);
  const {
    data: news,
    isError: newsError,
    isLoading: newsLoading,
  } = getNewsBySymbol(stock.symbol);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>error</div>;
  }

  if (data) {
    if (news) {
      console.log(news);
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
                  user.removeFromWatchlist(stock.symbol);
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
                  user.updateTracker(stock.symbol);
                } else {
                  console.log("unchecked");
                  user.removeTracker(stock.symbol);
                }
              }
            }}
          ></input>
        </h2>
        <ChartView symbol={stock.symbol}></ChartView>
        <p>{data.Description}</p>
      </div>
    );
  }
};

export default page;
