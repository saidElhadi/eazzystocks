"use client";
import React from "react";
import { UserAuth } from "@/lib/context/AuthContext";
import GainersLosers from "@/src/app/gainers_and_loosers/page";
import { Container } from "@/lib/basic_components/container.styled";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import WatchList from "@/src/app/watchlist/page";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import algoliasearch from "algoliasearch";

function Dashboard() {
  const { user } = UserAuth();
  return (
    <Container>
      <GainersLosers isPreview={true} />
      <WatchList isPreview={true} />
    </Container>
  );
}

export default Dashboard;
