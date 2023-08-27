import React, { useState, useEffect } from "react";
import { get7DaysChange } from "@/lib/getDataFromAPIs";  // Import the get7DaysChange function

export const StockCardList = ({ user }) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const promises = user?.watchlist?.map(async (stock) => {
        const sevenDayChange = await get7DaysChange(stock.symbol);
        return { ...stock, ...sevenDayChange };
      });

      const resolvedStockData = await Promise.all(promises);
      setStockData(resolvedStockData);
    };

    fetchStockData();
  }, [user]);

  return (
    <>
      {stockData.map((stock, index) => (
        <StockCardContainer key={index} height={"sm"} width={"full"}>
          <PreviewName href={`/stock/${stock.symbol}`}>{stock.symbol}</PreviewName>
          <SparkLineChart data={stock.someDataProperty} />
          <div>Change: {stock.change}</div>
          <div>Change in Percentage: {stock.changeInPercentage}</div>
        </StockCardContainer>
      ))}
    </>
  );
};