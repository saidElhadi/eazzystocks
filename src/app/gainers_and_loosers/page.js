"use client";
import {
  Container,
  ContainerPreview,
  PreviewHeader,
} from "./components/gainers_and_loosers.styled";
import { Card } from "./components/Card";
import { useGainersAndLoosers } from "@/lib/getDataFromAPI";
import { getFinancialAsset } from "@/lib/FinancialAsset";
import { useEffect, useState } from "react";
import Link from "next/link";

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

  if (isLoading) {
    return <Container></Container>;
  }
  if (isError) {
    return <Container>error</Container>;
  }

  if (data && isPreview) {
    return (
      <ContainerPreview>
        <Link href={"/gainers_and_loosers"}>Gainers and Loosers Preview</Link>
      </ContainerPreview>
    );
  }
  if (!isPreview) {
    return <>Gainers and Loosers Page</>;
  }
}

export default GainersLosers;
