"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { UserAuth } from "@/lib/context/AuthContext";
import { Container } from "@/lib/basic_components/container.styled";
import {
  ChartContainer,
  InfoContainer,
  InfoItem,
  Logo,
  CompanyName,
  PreviewChangePercent,
  PreviewChangePrice,
  PreviewPrice,
  InfoContainerPrices,
} from "./components/stock.styled";
import {
  fetchTimeSeries,
  fetchCompanyOverview,
  formatFetchTimeSeries,
  getGlobalQuote,
  getNewsBySymbol,
} from "@/lib/getDataFromAPI";
import { FullSizeChart } from "@/lib/chart/Chart";
// temp
import styled from "styled-components";
import {
  NewsCard,
  NewsCardContainer,
  NewsCardImage,
  NewsCardLink,
  NewsCardSubtitle,
  NewsCardTitle,
} from "../../news/components/news.styled";
import Link from "next/link";
import { Button } from "@/lib/basic_components/button.styled";
import { Header1 } from "@/lib/basic_components/headers.styled";
import { FinancialAsset, getFinancialAsset } from "@/lib/FinancialAsset";

const Page = ({ params }) => {
  // Watchlist and Tracker manip

  const [isInTracker, setIsInTracker] = useState(false);
  const [financialAsset, setFinancialAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [quote, setQuote] = useState(null);
  const [overview, setOverview] = useState(null);
  const [timeSeries, setTimeSeries] = useState(null);
  const [timeSeriesInterval, setTimeSeriesInterval] = useState("Daily");
  const [news, setNews] = useState(null);
  const { user } = UserAuth();

  // check if user have the stock in the watchlist
  let stock = getFinancialAsset(params.symbol);

  useEffect(() => {
    try {
      fetchCompanyOverview(params.symbol).then((data) => {
        console.log("debug datafetch", data);
        setOverview(data);
      });
      getGlobalQuote(params.symbol).then((data) => {
        console.log("debug datafetch", data);
        setQuote(data);
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }, [params.symbol]);

  useEffect(() => {
    if (user) {
      setIsInWatchlist(user.checkIfInWatchlist(params.symbol));
      stock = user?.getItemFromWatchlist(params.symbol);
    }
  }, [user]);

  useEffect(() => {
    fetchTimeSeries(params.symbol, timeSeriesInterval).then((data) => {
      console.log("debug datafetch", data);
      formatFetchTimeSeries(data, timeSeriesInterval).then((data) => {
        setTimeSeries(data);
      });
    });
  }, [params.symbol, timeSeriesInterval]);

  useEffect(() => {
    getNewsBySymbol(params.symbol).then((data) => {
      console.log("debug datafetch", data);
      setNews(data);
    });
  }, [params.symbol]);

  if (true) {
    return (
      <Container>
        <InfoContainer>
          <CompanyName>{overview ? overview.Name : "Loading"}</CompanyName>
          <Logo
            src={`https://financialmodelingprep.com/image-stock/${overview?.Symbol}.jpg`}
          />
        </InfoContainer>
        <InfoContainerPrices>
          <PreviewPrice up={quote && quote["09. change"] > 0}>
            {quote
              ? parseFloat(quote["05. price"]).toFixed(2) + "$"
              : "Loading"}
          </PreviewPrice>
          <PreviewChangePercent up={quote && quote["09. change"] > 0}>
            {quote
              ? parseFloat(quote["10. change percent"]).toFixed(2) + "%"
              : "Loading"}
          </PreviewChangePercent>
          <PreviewChangePrice up={quote && quote["09. change"] > 0}>
            {quote ? parseFloat(quote["09. change"]).toFixed(2) : "Loading"}
          </PreviewChangePrice>
          <h6>Global Quote</h6>
        </InfoContainerPrices>

        {/* Select Interval: */}
        <div>
          <select
            onChange={(e) => setTimeSeriesInterval(e.target.value)}
            value={timeSeriesInterval}
          >
            <option value="1min">1 Minute</option>
            <option value="5min">5 Minutes</option>
            <option value="15min">15 Minutes</option>
            <option value="30min">30 Minutes</option>
            <option value="60min">60 Minutes</option>
            <option value="Daily">Day</option>
            <option value="Weekly">Week</option>
            <option value="Monthly">Month</option>
          </select>
        </div>
        <ChartContainer>
          {timeSeries && <FullSizeChart data={timeSeries} />}
        </ChartContainer>

        <Button
          show={!isInWatchlist}
          onClick={() => {
            user?.addToWatchlist({
              symbol: params.symbol,
              type: "Stock",
            });
            setIsInWatchlist(true);
          }}
        >
          Add to Watchlist
        </Button>
        <Button
          show={isInWatchlist}
          onClick={() => {
            user.removeFromWatchlist(params.symbol);
            setIsInWatchlist(false);
          }}
        >
          Remove from Watchlist
        </Button>

        <Button
          onClick={() => {
            user?.addToWatchlist({
              symbol: params.symbol,
              type: "Stock",
            });
            setIsInWatchlist(true);
          }}
        ></Button>
        <NewsCardContainer>
          <Header1>News</Header1>
          {news?.feed?.map((item, index) => {
            // @/src/app/news/components/news.styles.js
            return (
              <NewsCardLink key={index} style={{ textDecoration: "none" }} href={item.url}>
                <NewsCard >
                  <NewsCardImage src={item.banner_image} />
                  <NewsCardTitle>
                    {String(item.title).slice(0, 20)}...
                  </NewsCardTitle>
                  <NewsCardSubtitle></NewsCardSubtitle>
                </NewsCard>
              </NewsCardLink>
            );
          })}
        </NewsCardContainer>
      </Container>
    );
  }
};

export default Page;
