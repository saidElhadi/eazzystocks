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
import {
  get24HoursChange,
  fetchLast24HoursData,
  fetchLast30DaysData,
  fetchLast7DaysData,
  get7DaysChange,
} from "@/lib/getDataFromAPI";
import { Chart } from "chart.js/auto";

const Preview = () => {
  const { user } = UserAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchLast24HoursData("AAPL").then((data) => setChartData(data));
  }, [user]);
  useEffect(() => {
    if (user?.watchlist) {
      setWatchlist(user?.watchlist);
    }
  }, [user?.watchlist]);
  return (
    <PreviewContainer>
      <h2>WatchList</h2>
      {user?.watchlist?.map((stock, index) => {
        console.log("test", stock);
        return <StockCard symbol={stock.symbol} key={index} />;
      })}
    </PreviewContainer>
  );
};
export default Preview;

const StockCard = ({ symbol }) => {
  const [data, setData] = useState([]);
  const [changeData, setChangeData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  console.log(symbol, data);
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
    <StockCardContainer>
      <Link
        style={{ textDecoration: "none", color: "grey" }}
        href={`/stock/${symbol}`}
      >
        <PreviewImage
          src={`https://storage.googleapis.com/iex/api/logos/${symbol}.png`}
          width={50}
          height={50}
        />
      </Link>

      <PreviewHeader>
        <PreviewName>{symbol}</PreviewName>
        <PreviewPrecentageChange>
          {changeData?.changeInPercentage}{" "}
          {parseFloat(changeData?.changeInPercentage) > 0 ? "▲" : "▼"}
        </PreviewPrecentageChange>
        <PreviewPriceChange></PreviewPriceChange>
      </PreviewHeader>
      <SparkLineChart
        data={data}
        up={(changeData?.changeInPercentage) > 0 ? true : false}
      />
      <>{parseFloat(changeData?.change).toFixed(2)}</>
      <StockCardMenu symbol={symbol} refresh={refresh} setRefresh={setRefresh}/>
    </StockCardContainer>
  );
};
const SparkLineChart = ({ data, up }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    if (data != [] && chartRef && chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: data?.map((entry) => entry.timestamp),
          datasets: [
            {
              data: data?.map((entry) => entry.close),
              borderColor: up ? "#00ff00" : "#ff0000",
              fill: false,
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          elements: {
            line: {
              borderColor: "#000000",
              borderWidth: 1,
            },
            point: {
              radius: 0,
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
        },
      });
      return () => chart.destroy();
    }
  }, [data]);

  return <canvas width={"70px"} ref={chartRef} />;
};
const StockCardMenu = ({ symbol, refresh, setRefresh}) => {
  const { user } = UserAuth();
  return (
    <>
      <button
        onClick={() => {
          console.log("remove");
          user?.removeFromWatchlist(symbol);
          setRefresh(!refresh)
        }}
      >
        Rm
      </button>
      <button
        onClick={() => {
          console.log("track");
        }}
      >
        Trk
      </button>
    </>
  );
};
