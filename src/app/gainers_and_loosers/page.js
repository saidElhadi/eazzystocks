"use client";
import {
  Container,
} from "@/lib/basic_components/container.styled";
import { Card } from "./components/Card";
import { useGainersAndLoosers } from "@/lib/getDataFromAPI";
import { getFinancialAsset } from "@/lib/FinancialAsset";
import { useEffect, useState } from "react";
import Link from "next/link";
import Page from "./components/Page";
import Preview from "./components/Preview";

function GainersLosers({ isPreview = false }) {
  const { data, isError, isLoading } = useGainersAndLoosers();
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

  // made a bug here
  // if (isLoading) {
  //   return <Container></Container>;
  // }
  if (isError) {
    return <Container>error</Container>;
  }

  if (isPreview) {
    return (
      <Preview data={data} isPreview={isPreview} isError={isError}/>
    );
  }
  if (!isPreview) {
    return <Page data={data}/>
  }
}

export default GainersLosers;
