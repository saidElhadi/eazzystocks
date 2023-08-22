import { firestore_db } from "@/firebase/config";
import { useState } from "react";
import useSWR from "swr";

const BASE_URL = "https://www.alphavantage.co/query";
const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VENTAGE_APIKEY;

const fetcher = (url) => fetch(url).then((res) => res.json());
export const getDocument = async (collection, docId) => {
  const docRef = doc(firestore_db, collection, docId);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.exists() ? docSnapshot.data() : null;
};
export const setDocument = async (collection, docId, data) => {
  const docRef = doc(firestore_db, collection, docId);
  await setDoc(docRef, data);
};

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

export const getLatestPrice = (symbol) => {
  const endpoint = "TIME_SERIES_DAILY";
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("symbol", symbol);

  const { data, error, isLoading } = useSWR(url.toString(), fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
  // return latest price
};

export const getGainersAndLoosers = () => {
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

export const getNewsBySymbol = (symbol, limit = 70) => {
  const endpoint = "NEWS_SENTIMENT";
  const url = new URL(`${BASE_URL}?function=${endpoint}`);
  url.searchParams.append("limit", 20);
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("tickers", symbol);

  console.log('gebug get news', url.toString())
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
