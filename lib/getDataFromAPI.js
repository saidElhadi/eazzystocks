import { firestore_db } from "@/firebase/config";
import { useEffect, useState } from "react";
import useSWR from "swr";

const BASE_URL = "https://www.alphavantage.co/query";
const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VENTAGE_APIKEY;

const fetcher = (url) => fetch(url).then((res) => res.json());

// firebase
export const getDocument = async (collection, docId) => {
  const docRef = doc(firestore_db, collection, docId);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.exists() ? docSnapshot.data() : null;
};
export const setDocument = async (collection, docId, data) => {
  const docRef = doc(firestore_db, collection, docId);
  await setDoc(docRef, data);
};

// Company Overview
export const useCompanyOverview = (symbol) => {
  const endpoint = "OVERVIEW";
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("symbol", symbol);

  const { data, error, isLoading } = useSWR(url.toString(), fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 3600000,
  });

  return {
    data: data,
    isLoading: isLoading,
    isError: error,
  };
};
export const fetchCompanyOverview = async (symbol) => {
  const endpoint = "OVERVIEW";
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("symbol", symbol);

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("debug fetchCompanyOverview error", error);
  }
};

// Intraday Time Series
export const useIntradayTimeSeries = (symbol, interval, options = {}) => {
  let endpoint;
  switch (interval) {
    case "Daily":
      endpoint = "TIME_SERIES_DAILY";
      break;
    case "Weekly":
      endpoint = "TIME_SERIES_WEEKLY";
      break;
    case "Monthly":
      endpoint = "TIME_SERIES_MONTHLY";
      break;
    default:
      endpoint = "TIME_SERIES_INTRADAY"; // Fallback to intraday if an unknown interval is passed
  }
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  console.log("debug useIntradayTimeSeries url", symbol);

  // mendatory parms
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("symbol", symbol.symbol);
  url.searchParams.append("interval", interval);
  // optional parms
  // Append optional parameters if provided
  if (options.adjusted !== undefined) {
    url.searchParams.append("adjusted", options.adjusted);
  }
  if (options.extended_hours !== undefined) {
    url.searchParams.append("extended_hours", options.extended_hours);
  }
  if (options.month !== undefined) {
    url.searchParams.append("month", options.month);
  }
  if (options.outputsize !== undefined) {
    url.searchParams.append("outputsize", options.outputsize);
  }
  if (options.datatype !== undefined) {
    url.searchParams.append("datatype", options.datatype);
  }
  // set swr options
  console.log("debug useIntradayTimeSeries url", url.toString());
  const { data, error, isValidating } = useSWR(url.toString(), fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 3600000,
  });

  return {
    data: data,
    isLoading: isValidating,
    isError: error,
  };
};
export const useIntradayTimeSeries2 = (symbol, interval, options = {}) => {
  let endpoint;
  switch (interval) {
    case "Daily":
      endpoint = "TIME_SERIES_DAILY";
      break;
    case "Weekly":
      endpoint = "TIME_SERIES_WEEKLY";
      break;
    case "Monthly":
      endpoint = "TIME_SERIES_MONTHLY";
      break;
    default:
      endpoint = "TIME_SERIES_INTRADAY";
  }
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("symbol", symbol.symbol);
  url.searchParams.append("interval", interval);
  if (options.adjusted !== undefined) {
    url.searchParams.append("adjusted", options.adjusted);
  }
  if (options.extended_hours !== undefined) {
    url.searchParams.append("extended_hours", options.extended_hours);
  }
  if (options.month !== undefined) {
    url.searchParams.append("month", options.month);
  }
  if (options.outputsize !== undefined) {
    url.searchParams.append("outputsize", options.outputsize);
  }
  if (options.datatype !== undefined) {
    url.searchParams.append("datatype", options.datatype);
  }
  console.log("debug useIntradayTimeSeries2 url", url.toString());
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(error);
      });
  }, [url]);
  return {
    data: data,
    isLoading: isLoading,
    isError: isError,
  };
};

// Fetch and format timeseries
export const fetchTimeSeries = async (symbol, interval, options = {}) => {
  let endpoint;
  switch (interval) {
    case "Daily":
      endpoint = "TIME_SERIES_DAILY";
      break;
    case "Weekly":
      endpoint = "TIME_SERIES_WEEKLY";
      break;
    case "Monthly":
      endpoint = "TIME_SERIES_MONTHLY";
      break;
    default:
      endpoint = "TIME_SERIES_INTRADAY";
  }
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("symbol", symbol);
  url.searchParams.append("interval", interval);
  console.log(url.toString());
  // optional parms
  // Append optional parameters if provided
  if (options.adjusted !== undefined) {
    url.searchParams.append("adjusted", options.adjusted);
  }
  if (options.extended_hours !== undefined) {
    url.searchParams.append("extended_hours", options.extended_hours);
  }
  if (options.month !== undefined) {
    url.searchParams.append("month", options.month);
  }
  if (options.outputsize !== undefined) {
    url.searchParams.append("outputsize", options.outputsize);
  }
  if (options.datatype !== undefined) {
    url.searchParams.append("datatype", options.datatype);
  }

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("debug fetchTimeSeries error", error);
  }
};
export const formatFetchTimeSeries = async (data, interval) => {
  let timeSeries;
  console.log("debug formatFetchTimeSeris", data, interval);
  switch (interval) {
    case "Daily":
      timeSeries = data["Time Series (Daily)"];
      break;
    case "Weekly":
      timeSeries = data["Weekly Time Series"];
      break;
    case "Monthly":
      timeSeries = data["Monthly Time Series"];
      break;
    default:
      timeSeries = data[`Time Series (${interval})`];
  }
  console.log("debug formatFetchTimeSeris", typeof timeSeries);

  if (!timeSeries) {
    throw new Error("Invalid data format");
  }
  const transformedData = Object.keys(timeSeries).map((date) => ({
    timestamp: date,
    close: parseFloat(timeSeries[date]["4. close"]),
    open: parseFloat(timeSeries[date]["1. open"]),
    high: parseFloat(timeSeries[date]["2. high"]),
    low: parseFloat(timeSeries[date]["3. low"]),
  }));
  console.log("debug formatFetchTimeSeris", transformedData);

  return transformedData;
};

// Search
export const useSearch = async (keywords) => {
  const endpoint = "SYMBOL_SEARCH";
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("keywords", keywords);

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return data.bestMatches;
  } catch (error) {
    console.log("debug useSearch error", error);
  }
};
// gainers and loosers
export const useGainersAndLoosers = () => {
  const endpoint = "TOP_GAINERS_LOSERS";
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("apikey", API_KEY);

  const { data, error, isLoading } = useSWR(url.toString(), fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 3600000,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
// news
export const getNewsBySymbol = async (symbol) => {
  const endpoint = "NEWS_SENTIMENT";
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("limit", 20);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("tickers", symbol);

  // console.log('get data from api: get news, url', url.toString())
  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("debug getNewsBySymbol error", error);
  }
};
export const getLatestNews = async () => {
  const endpoint = "NEWS_SENTIMENT";
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("limit", 20);
  url.searchParams.append("apikey", API_KEY);

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("debug getLatestNews error", error);
  }
};

export const useDailyTimeSeries = (symbol, options = {}) => {
  return useIntradayTimeSeries(symbol, "Daily", options);
};

export const useWeeklyTimeSeries = (symbol, options = {}) => {
  return useIntradayTimeSeries(symbol, "Weekly", options);
};

export const useMonthlyTimeSeries = (symbol, options = {}) => {
  return useIntradayTimeSeries(symbol, "Monthly", options);
};

// get change in percentage and change in price for the last 24 hours and 7days
export const getGlobalQuote = async (symbol) => {
  const endpoint = "GLOBAL_QUOTE";
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("symbol", symbol);
  // try catch
  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    console.log("debug getGlobalQuote ", data["Global Quote"]);
    return data["Global Quote"];
  } catch (error) {
    console.log("debug getGlobalQuote error", error);
  }
};
export const get7DaysChange = async (symbol) => {
  const endpoint = "TIME_SERIES_DAILY"; // Use your actual endpoint for daily data
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("symbol", symbol);

  // Optional: Limit the data size
  url.searchParams.append("outputsize", "compact"); // Example: 'compact' will return only the last 100 data points

  try {
    const res = await fetch(url.toString());
    const data = await res.json();

    // Assuming the data comes in an object under the 'Time Series (Daily)' property
    const timeSeries = data["Time Series (Daily)"];

    if (!timeSeries) {
      throw new Error("Invalid data format");
    }

    // Get the last 7 data points (you might need to adjust this based on your actual data structure)
    const last7Days = Object.keys(timeSeries).sort().slice(-7);

    const firstDay = timeSeries[last7Days[0]];
    const lastDay = timeSeries[last7Days[6]]; // 7th day, index starts from 0

    if (firstDay && lastDay) {
      const oldClose = parseFloat(firstDay["4. close"]);
      const newClose = parseFloat(lastDay["4. close"]);

      const change = newClose - oldClose;
      const changeInPercentage = ((change / oldClose) * 100).toFixed(2); // rounding to 2 decimal places

      return { change, changeInPercentage, price: newClose };
    } else {
      throw new Error("Incomplete data for 7-day change");
    }
  } catch (error) {
    console.log("debug get7DaysChange error", error);
    return null;
  }
};
// get the data to plot the chart for the last 24 hours and 7days and 30 days
export const fetchLast24HoursData = async (symbol) => {
  try {
    const interval = "5min"; // you can adjust this
    const url = `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data["Error Message"]) {
      console.error("Invalid symbol or API error:", data["Error Message"]);
      return null;
    }

    const timeSeries = data[`Time Series (${interval})`];
    const now = new Date();

    // Filter data to include only the last 24 hours
    const filteredKeys = Object.keys(timeSeries).filter((timestamp) => {
      const timeDifference = now - new Date(timestamp);
      return timeDifference <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    });

    const filteredData = filteredKeys.map((key) => ({
      timestamp: key,
      close: parseFloat(timeSeries[key]["4. close"]),
      open: parseFloat(timeSeries[key]["1. open"]),
      high: parseFloat(timeSeries[key]["2. high"]),
      low: parseFloat(timeSeries[key]["3. low"]),
    }));

    return filteredData;
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};
export const fetchLast30DaysData = async (symbol) => {
  try {
    const endpoint = "TIME_SERIES_DAILY";
    const url = new URL(`${BASE_URL}?function=${endpoint}`);

    url.searchParams.append("apikey", API_KEY);
    url.searchParams.append("symbol", symbol);
    url.searchParams.append("outputsize", 30); // Assuming the API accepts an "outputsize" parameter to limit the number of days

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data["Error Message"] || data["Note"]) {
      // Handle API errors or limitations here
      return null;
    }

    // Transform data into an array of objects containing only the last 30 days
    // Assuming data is stored in the `Time Series (Daily)` key
    const timeSeries = data["Time Series (Daily)"];
    const transformedData = Object.keys(timeSeries)
      .slice(0, 30)
      .map((date) => ({
        timestamp: date,
        close: parseFloat(timeSeries[date]["4. close"]),
        open: parseFloat(timeSeries[date]["1. open"]),
        high: parseFloat(timeSeries[date]["2. high"]),
        low: parseFloat(timeSeries[date]["3. low"]),
      }));

    return transformedData;
  } catch (error) {
    console.error("There was an error fetching the 30-day data", error);
    return null;
  }
};
export const fetchLast7DaysData = async (symbol) => {
  try {
    const endpoint = "TIME_SERIES_DAILY";
    const url = new URL(`${BASE_URL}?function=${endpoint}`);

    url.searchParams.append("apikey", API_KEY);
    url.searchParams.append("symbol", symbol);
    // url.searchParams.append("outputsize", 7); // Assuming the API accepts an "outputsize" parameter to limit the number of days

    const response = await fetch(url.toString(), {});
    const data = await response.json();

    if (data["Error Message"] || data["Note"]) {
      console.log("debug fetchLast7DaysData", url.toString());
      // Handle API errors or limitations here
      return null;
    }

    // Transform data into an array of objects containing only the last 30 days
    // Assuming data is stored in the `Time Series (Daily)` key
    const timeSeries = data["Time Series (Daily)"];
    const transformedData = Object.keys(timeSeries)
      .sort()
      .slice(-7)
      .map((date) => ({
        timestamp: date,
        close: parseFloat(timeSeries[date]["4. close"]),
        open: parseFloat(timeSeries[date]["1. open"]),
        high: parseFloat(timeSeries[date]["2. high"]),
        low: parseFloat(timeSeries[date]["3. low"]),
      }));

    return transformedData;
  } catch (error) {
    console.error("There was an error fetching the 30-day data", error);
    return null;
  }
};

export const fetchLast365DaysData = async (symbol) => {
  try {
    const endpoint = "TIME_SERIES_MONTHLY";
    const url = new URL(`${BASE_URL}?function=${endpoint}`);

    url.searchParams.append("apikey", API_KEY);
    url.searchParams.append("symbol", symbol);
    url.searchParams.append("outputsize", 30); // Assuming the API accepts an "outputsize" parameter to limit the number of days

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data["Error Message"] || data["Note"]) {
      // Handle API errors or limitations here
      return null;
    }

    // Transform data into an array of objects containing only the last 30 days
    // Assuming data is stored in the `Time Series (Daily)` key
    const timeSeries = data["Time Series (Daily)"];
    const transformedData = Object.keys(timeSeries)
      .slice(0, 350)
      .map((date) => ({
        timestamp: date,
        close: parseFloat(timeSeries[date]["4. close"]),
        open: parseFloat(timeSeries[date]["1. open"]),
        high: parseFloat(timeSeries[date]["2. high"]),
        low: parseFloat(timeSeries[date]["3. low"]),
      }));

    return transformedData;
  } catch (error) {
    console.error("There was an error fetching the 30-day data", error);
    return null;
  }
};

// perf
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  // Round minutes down to the nearest 5-minute interval
  const minutes = Math.floor(date.getMinutes() / 5) * 5;

  const paddedMinutes = String(minutes).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  console.log(
    `debug time format ${year}-${month}-${day} ${hours}:${paddedMinutes}:${seconds}`
  );
  return `${year}-${month}-${day}`;
}
export const calculateMetrics = (data) => {
  if (!data || data.length === 0) {
    console.error("Data array is empty or undefined");
    return null;
  }

  let firstDay = data[0];
  let lastDay = data[data.length - 1];

  let change = lastDay.close - firstDay.close;
  let changeInPercentage = ((change / firstDay.close) * 100).toFixed(2);
  let price = lastDay.close;

  return { data, change, changeInPercentage, price };
};
export const fetchCustomRangeData = async (symbol, tracker) => {
  const trackerDate = tracker?.toDate();
  const formattedTrackerDate = formatDate(trackerDate);
  // Get current date and time
  const currentDate = new Date();

  // Calculate time difference in milliseconds
  const timeDifference = currentDate.getTime() - trackerDate.getTime();

  // Calculate time difference in hours
  const timeDifferenceInHours = timeDifference / (1000 * 3600);

  let endpoint, timeSeriesKey;

  // Switch between daily and intraday based on time difference
  if (timeDifferenceInHours <= 24) {
    endpoint = "TIME_SERIES_INTRADAY";
    timeSeriesKey = "Time Series (5min)";
  } else {
    endpoint = "TIME_SERIES_DAILY";
    timeSeriesKey = "Time Series (Daily)";
  }

  const url = `${BASE_URL}?function=${endpoint}&symbol=${symbol}&apikey=${API_KEY}`;
  if (endpoint === "TIME_SERIES_INTRADAY") {
    url.concat("interval=5min");
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    const timeSeries = data[timeSeriesKey];

    if (!timeSeries) {
      throw new Error("Invalid data format");
    }

    const mostRecentDate = Object.keys(timeSeries).sort().reverse()[0];
    console.log('debug here', mostRecentDate)
    const dataOnTrackerDate = timeSeries[formattedTrackerDate];
    console.log('debug here', formattedTrackerDate , mostRecentDate)

    const mostRecentData = timeSeries[mostRecentDate];

    if (!dataOnTrackerDate || !mostRecentData) {
      throw new Error("Data not available for the given range");
    }

    const oldPrice = parseFloat(dataOnTrackerDate["4. close"]);
    const newPrice = parseFloat(mostRecentData["4. close"]);

    const change = newPrice - oldPrice;
    const changeInPercentage = ((change / oldPrice) * 100).toFixed(2);
    const price = newPrice;
    console.log('debug here',change, changeInPercentage, price, oldPrice, trackerDate, currentDate)

    return { change, changeInPercentage, price, oldPrice, trackerDate, currentDate };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const fetchStockData = async (symbol) => {
  const endpoint = "TIME_SERIES_DAILY";
  const url = `${BASE_URL}?function=${endpoint}&symbol=${symbol}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data["Time Series (Daily)"];
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
};
