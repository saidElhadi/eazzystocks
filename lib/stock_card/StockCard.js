import React, { useState, useEffect } from "react";
import { fetchLast7DaysData,  get7DaysChange } from "@/lib/getDataFromAPI";
import {
  StockCardContainer,
  PreviewHeader,
  PreviewImage,
  PreviewName,
  PreviewPriceChange,
  PreviewPrecentageChange,
} from "./stock_card.sytled";

import Link from "next/link";
import { SparkLineChart } from "@/lib/SparkLineChart";

export const StockCard = ({ symbol }) => {
  const [data, setData] = useState([]);
  const [changeData, setChangeData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetchLast7DaysData(symbol).then((data) => {
      setData(data);
    });
    get7DaysChange(symbol).then((data) => {
      console.log("debug", data);
      setChangeData(data);
    });
  }, []);
  return (
    // change later
    <StockCardContainer
      onClick={() => {
        setRefresh(!refresh);
      }}
    >
      <Link
        style={{ textDecoration: "none", color: "grey" }}
        href={`/stock/${symbol}`}
      >
        <PreviewImage
          src={`https://financialmodelingprep.com/image-stock/${symbol}.jpg`}
          width={50}
          height={50}
        />
      </Link>

      <PreviewHeader>
        <Link
          style={{ textDecoration: "none", color: "grey" }}
          href={`/stock/${symbol}`}
        >
          <PreviewName>{symbol}</PreviewName>
        </Link>
        <PreviewPrecentageChange>
          {changeData?.changeInPercentage}
          {"%"}
          {changeData?.price > 0 ? "▲" : "▼"}
        </PreviewPrecentageChange>
        <PreviewPriceChange></PreviewPriceChange>
      </PreviewHeader>
      {changeData != [] && (
        <SparkLineChart
          data={data}
          pricePercentageChange={changeData?.changeInPercentage}
        />
      )}
      <>{parseFloat(changeData?.price).toFixed(2)}</>
    </StockCardContainer>
  );
};
