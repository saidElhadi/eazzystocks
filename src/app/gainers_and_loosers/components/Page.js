import { Container } from "@/lib/basic_components/container.styled";
import Header from "@/lib/header/Header";
import React from "react";
import {
  BoardContainer,
  GainerElement,
  LooserElement,
} from "./gainers_and_loosers.styled";
import Link from "next/link";

const RenderGainerLosserElems = (data) => {
  const top_gainers = data?.top_gainers;
  const top_losers = data?.top_losers;
  const rankedPairs = [];
  console.log("debug", top_gainers);
  if (top_gainers && top_losers) {
    for (let i = 0; i < top_gainers.length; i++) {
      rankedPairs.push([top_gainers[i], top_losers[i]]);
      console.log(rankedPairs);
    }

    return rankedPairs.map((pair, index) => {
      return (
        <React.Fragment key={index}>
          <Link
            style={{ textDecoration: "none" }}
            href={`/stock/${pair[0].ticker}`}
          >
            <GainerElement rank={index + 1}>
              <span>{pair[0].ticker}</span>
              <p>+{parseFloat(pair[0].change_percentage).toFixed(2)}%</p>
            </GainerElement>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            href={`/stock/${pair[1].ticker}`}
          >
            <LooserElement rank={index + 1}>
              <span>{pair[1].ticker}</span>
              <p>{parseFloat(pair[1].change_percentage).toFixed(2)}%</p>
            </LooserElement>
          </Link>
        </React.Fragment>
      );
    });
  }
};

const Page = ({ data }) => {
  return (
    <Container style={{paddingTop: '100px'}}>
      <Header title={"Gainers & Loosers"} />
      <BoardContainer>{RenderGainerLosserElems(data)}</BoardContainer>
    </Container>
  );
};

export default Page;
