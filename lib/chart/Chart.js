import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import { fetchLast7DaysData } from "../getDataFromAPI";


export const FullSizeChart = ({ data }) => {
  const chartRef = useRef(null);
  console.log("debug fullsize chart", data)

  const borderColor = (data) => {
    if (!data || data.length === 0) {
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
    if (!data || data.length === 0 || !chartRef.current) {
      return;
    }

    const chart = new Chart(chartRef.current.getContext('2d'), {
      type: "line",
      data: {
        labels: data?.map((entry) => entry.timestamp),
        datasets: [
          {
            data: data.map((entry) => entry.close),
            borderColor: borderColor(data),
            fill: false,
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false ,

        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            // display: false,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} width={1000} height={200}></canvas>;
};
