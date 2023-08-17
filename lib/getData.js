import React from "react";
const TimeInterval = {
  ONE_MINUTE: "1min",
  FIVE_MINUTES: "5min",
  FIFTEEN_MINUTES: "15min",
  THIRTY_MINUTES: "30min",
  SIXTY_MINUTES: "60min",
};
const OutputSize = {
  COMPACT: "compact",
  FULL: "full",
};
const DataType = {
  JSON: "json",
  CSV: "csv",
};
export const getCompanyOverview = async (symbol) => {
  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VENTAGE_APIKEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // You can process the data further as per your requirements
    return data;
  } catch (error) {
    console.error(
      `An error occurred while fetching company overview: ${error}`
    );
    return null;
  }
};
export const getMultipleCompanyOverviews = async (symbols) => {
  // Map over the symbols array and create an array of promises
  const promises = symbols.map((symbol) => getCompanyOverview(symbol));

  // Use Promise.all to wait for all promises to resolve
  try {
    const overviews = await Promise.all(promises);
    return overviews;
  } catch (error) {
    console.error(
      `An error occurred while fetching multiple company overviews: ${error}`
    );
    return null;
  }
};
export const getTopGainersLosersActive = async () => {
  const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.NEXT_PUBLIC_ALPHA_VENTAGE_APIKEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `An error occurred while fetching top gainers, losers, and most actively traded tickers: ${error}`
    );
    return null;
  }
};
export const getNewsSentiment = async ({
  tickers,
  topics,
  time_from,
  time_to,
  sort,
  limit,
}) => {
  let url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${process.env.NEXT_PUBLIC_ALPHA_VENTAGE_APIKEY}`;

  if (tickers) url += `&tickers=${tickers}`;
  if (topics) url += `&topics=${topics}`;
  if (time_from) url += `&time_from=${time_from}`;
  if (time_to) url += `&time_to=${time_to}`;
  if (sort) url += `&sort=${sort}`;
  if (limit) url += `&limit=${limit}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`An error occurred while fetching news sentiment: ${error}`);
    return null;
  }
};
export const getTimeSeriesIntraday = ({
  symbol,
  interval,
  adjusted = true,
  extended_hours = true,
  month,
  outputsize = OutputSize.COMPACT,
  datatype = DataType.JSON,
}) => {
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VENTAGE_APIKEY}`;

  if (adjusted !== undefined) url += `&adjusted=${adjusted}`;
  if (extended_hours !== undefined) url += `&extended_hours=${extended_hours}`;
  if (month) url += `&month=${month}`;
  if (outputsize) url += `&outputsize=${outputsize}`;
  if (datatype) url += `&datatype=${datatype}`;

  // Use fetch to get data
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
export const getTimeSeriesDaily = ({
  symbol,
  outputsize = "compact",
  datatype = "json",
  apikey,
}) => {
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apikey}`;

  if (outputsize) url += `&outputsize=${outputsize}`;
  if (datatype) url += `&datatype=${datatype}`;

  // Use fetch to get data
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
export const getTimeSeriesWeekly = ({ symbol, datatype = "json" }) => {
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VENTAGE_APIKEY}`;

  if (datatype) url += `&datatype=${datatype}`;

  // Use fetch to get data
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
export const getTimeSeriesMonthly = ({ symbol, datatype = "json" }) => {
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VENTAGE_APIKEYF}`;

  if (datatype) url += `&datatype=${datatype}`;

  // Use fetch to get data
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
export const searchSymbols = async ({ keywords, datatype }) => {
  let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VENTAGE_APIKEY}`;

  if (datatype) url += `&datatype=${datatype}`;

  // Use fetch to get data
  fetch(url)
    .then((response) => response.json().then((data) => console.log(data)))
    .catch((error) => {
      console.error(error);
      return [];
    });
};
