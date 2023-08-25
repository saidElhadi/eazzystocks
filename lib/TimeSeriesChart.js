import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import { useIntradayTimeSeries } from "@/lib/getDataFromAPI";
const BASE_URL = "https://www.alphavantage.co/query";

const TimeSeriesChart = ({ symbol, interval }) => {
  const chartRef = useRef(null);
  const { data, error } = useIntradayTimeSeries(symbol, interval);
  useEffect(() => {
    if (!data || !chartRef.current) return;
    console.log(data);
    if (data[`Time Series (${interval})`] && chartRef.current) {
      const timeSeries = data[`Time Series (${interval})`];
      const labels = Object.keys(timeSeries).reverse();
      const closePrices = Object.values(timeSeries)
        .map((entry) => parseFloat(entry["4. close"]))
        .reverse();
      const openPrices = Object.values(timeSeries)
        .map((entry) => parseFloat(entry["1. open"]))
        .reverse();

      const minPrice = Math.min(...closePrices);
      const maxPrice = Math.max(...closePrices);
      // get time scale from interval and set the chart
      let timeScale;
      switch (interval) {
        case "Daily":
          timeScale = "day";
          break;
        case "Weekly":
          timeScale = "week";
          break;
        case "Monthly":
          timeScale = "month";
          break;
        default:
          timeScale = "minute";
          break;
      }

      const chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: `Close Prices (${interval})`,
              data: closePrices,
              borderColor: "rgba(75, 192, 192, 1)",
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "time",
              time: {
                unit: timeScale,
                displayFormats: {
                  minute: "h:mm a",
                  day: "MMM D",
                  week: "ll",
                  month: "MMM YYYY",
                },
              },
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              min: minPrice,
              max: maxPrice,
            },
          },
        },
      });

      return () => chart.destroy();
    }
  }, [data, interval]);

  return <canvas ref={chartRef} width="350" height="200"></canvas>;
};

export const ChartView = (symbol) => {
  console.log("debug In ChartView symbol = ", symbol);
  const [interval, setInterval] = useState("5min");

  return (
    <div>
      <select onChange={(e) => setInterval(e.target.value)} value={interval}>
        <option value="1min">1 Minute</option>
        <option value="5min">5 Minutes</option>
        <option value="15min">15 Minutes</option>
        <option value="30min">30 Minutes</option>
        <option value="60min">60 Minutes</option>
        <option value="Daily">Day</option>
        <option value="Weekly">Week</option>
        <option value="Monthly">Month</option>
      </select>

      {<TimeSeriesChart symbol={symbol} interval={interval} />}
    </div>
  );
};

export default ChartView;
