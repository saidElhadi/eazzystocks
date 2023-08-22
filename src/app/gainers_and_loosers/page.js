"use client";
import Link from "next/link";
import useSWR from "swr";
import {
  Container,
  ContainerPreview,
  PreviewHeader,
} from "./components/styledComponents";
import { Card } from "./components/Card";
import { getGainersAndLoosers } from "@/lib/getDataFromAPI";
import { getFinancialAsset } from "@/lib/FinancialAsset";
import { useEffect, useState } from "react";

function GainersLosers({ isPreview = false }) {
  const { data, isError, isLoading } = getGainersAndLoosers();
  const [topGainer, setTopGainer] = useState(null);
  const [topLooser, setTopLooser] = useState(null);

  useEffect(() => {
    if (data) {
      const topGainer = getFinancialAsset(data?.top_gainers[0].ticker, "Stock");
      topGainer.data = data?.top_gainers[0];
      const topLooser = getFinancialAsset(data?.top_losers[0].ticker, "Stock");
      topLooser.data = data?.top_losers[0];

      setTopGainer(topGainer);
      setTopLooser(topLooser);
    }
  }, [data]);

  if (isLoading) {
    if (isPreview) {
      return (
        <>
          <PreviewHeader href={"/gainers_and_loosers"}>
            Gainers and losers
          </PreviewHeader>
          loading...
          <ContainerPreview>
            <Card
              name={"loading"}
              price={"..."}
              changePercent={"..."}
              changeCurrency={"..."}
              up={true}
            />

            <Card
              name={"loading"}
              price={"..."}
              changePercent={"..."}
              changeCurrency={"..."}
              up={false}
            />
          </ContainerPreview>
        </>
      );
    }
    return <Container></Container>;
  }
  if (isError) {
    return <Container>error</Container>;
  }

  if (data && isPreview) {
    return (
      <>
        <PreviewHeader href={"/gainers_and_loosers"}>
          Gainers and losers
        </PreviewHeader>
        <ContainerPreview>
          {topGainer && (
            <Card
              name={topGainer.symbol}
              price={topGainer.data.price}
              changePercent={topGainer.data.change_percentage}
              changeCurrency={topGainer.data.change_amount}
              up={true}
            />
          )}
          {topLooser && (
            <Card
              name={topLooser.symbol}
              price={topLooser.data.price}
              changePercent={topLooser.data.change_percentage}
              changeCurrency={topLooser.data.change_amount}
              up={false}
            />
          )}
        </ContainerPreview>
      </>
    );
  }
  if (!isPreview) {
    return <Container>page mode</Container>;
  }
}

export default GainersLosers;
