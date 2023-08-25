import { Box } from "@/lib/basic_components/box.styled";
import React from "react";
import { ContainerPreview } from "./gainers_and_loosers.styled";
import { Card } from "./Card";
import Link from "next/link";

const Preview = ({ isLoading, isError, data }) => {
  if (isLoading) {
    return (
      <>
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
      </>
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
    console.log(data);
    return (
      <Box height={"xl"} width={"full"}>
        <Link style={{ textDecoration: "none", color: 'grey'}} href={"/gainers_and_loosers"}>
          {" "}
          <h2>Gainers and losers</h2>
        </Link>
        <ContainerPreview>
          <Card
            name={data?.top_gainers[0].ticker}
            price={data?.top_gainers[0].price}
            changePercent={data?.top_gainers[0].change_percentage}
            changeCurrency={data?.top_gainers[0].change_amount}
            up={true}
          />
          <Card
            name={data?.top_losers[0].ticker}
            price={data?.top_losers[0].price}
            changePercent={data?.top_losers[0].change_percentage}
            changeCurrency={data?.top_losers[0].change_amount}
            up={false}
          />
        </ContainerPreview>
      </Box>
    );
  }
};

export default Preview;
