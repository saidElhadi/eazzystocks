import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";

export const SparkLineChart = ({ data }) => {
  const chartRef = useRef(null);

  const borderColor = (data) => { 
    // check if the data is valid or not 
    if (!data || data.length == 0) {
      return "grey";
    }
    let trend = data[data.length - 1]?.close - data[0]?.close;
    if (trend > 0) {
      return "#00C805";
    } else if (trend < 0) {
      return "#FF0000";
    } else {
      return "grey";
    }
  };

  useEffect(() => {
    if (data != [] && chartRef && chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: data?.map((entry) => entry.timestamp),
          datasets: [
            {
              data: data?.map((entry) => entry.close),
              borderColor: borderColor(data),
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
              borderColor: borderColor(data),
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