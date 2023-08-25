"use client";
import { getFinancialAsset } from "@/lib/FinancialAsset";
import React, { use, useEffect, useRef, useState } from "react";
import { UserAuth } from "@/lib/context/AuthContext";
import { useNewsBySymbol, useCompanyOverview, get24HoursCurrencyAndPercentChange } from "@/lib/getDataFromAPI";
import { User } from "@/lib/User";
import ChartView from "@/lib/TimeSeriesChart";

const page = ({ params, userObj }) => {
  const checkRef = useRef(null);
  const checkTrackRef = useRef();
  const { user } = UserAuth();
  console.log(params.symbol)
  const [stock, setStock] = useState(
    getFinancialAsset(params.symbol, "STOCK", undefined, undefined)
  );
  const {
    data: news,
    isError: newsError,
    isLoading: newsLoading,
  } = useNewsBySymbol(params.symbol);
  const {data: _24hData, isError: _24hDataError, isLoading: _24hDataLoading} = get24HoursCurrencyAndPercentChange(params.symbol)
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
        <h3>{_24hData && _24hData["Global Quote"]["05. price"]}$</h3>
        <h3>{_24hData && _24hData["Global Quote"]["10. change percent"]}</h3>
        
        
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
        <h3>Overview</h3>
        <p>{data.Description}</p>
        <>{news && news?.feed?.slice(0, 5).map(
          (elem) => { return <h4 key={elem.id}>{elem.title}</h4> }
        )}</>
        {/* change the above code to only show 5 news */}
        
      </div>
    );
  }
};

export default page;
