import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import { fetchLast7DaysData } from "@/lib/getDataFromAPI";

export const SparkLineChart = ({ symbol }) => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data?.length === 0) {
      fetchLast7DaysData(symbol).then((data) => setData(data));
    }
    if (data != [] && chartRef && chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: data?.map((entry) => entry.timestamp),
          datasets: [
            {
              data: data?.map((entry) => entry.close),
              borderColor: "rgba(75, 192, 192, 1)",
              fill: false,

              borderWidth: 1,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
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

  return <canvas ref={chartRef} />;
};
