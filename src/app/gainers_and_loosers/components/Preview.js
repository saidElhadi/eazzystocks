import { Box } from "@/lib/basic_components/box.styled";
import React from "react";
import { ContainerPreview, PreviewSectionContainer } from "./gainers_and_loosers.styled";
import { Card } from "./Card";
import Link from "next/link";
import { Header1Link } from "@/lib/basic_components/headers.styled";

const Preview = ({ isLoading, isError, data }) => {
  if (isLoading) {
    return (
      <PreviewSectionContainer>
        <h1 href={"/gainers_and_loosers"}>Gainers and losers</h1>
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
      </PreviewSectionContainer>
    );
  }
  if (isError) {
    return (
      <>
        <h1 href={"/gainers_and_loosers"}>Gainers and losers</h1>
        error
      </>
    );
  }
  if (data) {
    return (
      <PreviewSectionContainer>
        <Header1Link href={'/gainers_and_loosers'}>Gainers and losers</Header1Link>
          <ContainerPreview>
            {data && (
              <Card
                src={`https://storage.googleapis.com/iex/api/logos/${data?.top_gainers[0]?.ticker}.png`}
                name={data?.top_gainers[0]?.ticker}
                price={data?.top_gainers[0]?.price}
                changePercent={data?.top_gainers[0]?.change_percentage}
                changeCurrency={data?.top_gainers[0]?.change_amount}
                up={true}
              />
            )}
            {data && (
              <Card
                src={`https://storage.googleapis.com/iex/api/logos/${data?.top_losers[0]?.ticker}.png`}
                name={data?.top_losers[0]?.ticker}
                price={data?.top_losers[0]?.price}
                changePercent={data?.top_losers[0]?.change_percentage}
                changeCurrency={data?.top_losers[0]?.change_amount}
                up={false}
              />
            )}
          </ContainerPreview>
      </PreviewSectionContainer>
    );
  }
};

export default Preview;
