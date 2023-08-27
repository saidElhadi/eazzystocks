import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";

export const ChartPrice = ({ symbol, interval, isPreview }) => {
  const chartRef = useRef(null);
  const { data, error } = useIntradayTimeSeries(symbol, interval); // Assuming useIntradayTimeSeries is imported

  useEffect(() => {
    if (!data || !chartRef.current) return;
    if (data[`Time Series (${interval})`] && chartRef.current) {
      const timeSeries = data[`Time Series (${interval})`];
      const labels = Object.keys(timeSeries).reverse();
      const closePrices = Object.values(timeSeries)
        .map((entry) => parseFloat(entry["4. close"]))
        .reverse();

      const minPrice = Math.min(...closePrices);
      const maxPrice = Math.max(...closePrices);

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
              display: !isPreview, // Hide axis label in preview mode
            },
            y: {
              min: minPrice,
              max: maxPrice,
              display: !isPreview, // Hide axis label in preview mode
            },
          },
          plugins: {
            legend: {
              display: !isPreview, // Hide legend in preview mode
            },
          },
        },
      });

      return () => chart.destroy();
    }
  }, [data, interval]);

  const width = isPreview ? 70 : 350;
  const height = isPreview ? 120 : 200;

  return <canvas ref={chartRef} width={width} height={height}></canvas>;
};
