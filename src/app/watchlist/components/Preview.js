import React, { useEffect, useRef, useState } from "react";
import {
  StockCardContainer,
  PreviewContainer,
  PreviewHeader,
  PreviewImage,
  PreviewName,
  PreviewPriceChange,
  PreviewPrecentageChange,
} from "./watchlist.styled";
import Link from "next/link";
import { UserAuth } from "@/lib/context/AuthContext";
import { fetchLast7DaysData, get7DaysChange } from "@/lib/getDataFromAPI";
import { SparkLineChart } from "@/lib/SparkLineChart";
import { StockCard } from "@/lib/stock_card/StockCard"

const Preview = () => {
  
  const { user } = UserAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [refresh, setRefresh] = useState(null);

  useEffect(() => {
    if (user?.watchlist) {
      setWatchlist(user?.watchlist);
    }
  }, [user?.watchlist]);
  return (
    <PreviewContainer>
      <h2>WatchList</h2>
      {watchlist?.map((stock, index) => {
        console.log("test", stock);
        return (
          <StockCard
            symbol={stock.symbol}
            key={index}
            onClick={() => {
              setRefresh(!refresh);
            }}
          />
        );
      })}
    </PreviewContainer>
  );
};
export default Preview;

