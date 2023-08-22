"use client";
import React from "react";
import { UserAuth } from "../context/AuthContext";
import GainersLosers from "../gainers_and_loosers/page";
import { Container } from "./components/styledComponents";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import WatchList from "../wachlist/page";

function page() {
  const { user } = UserAuth();
  return (
    <Container>
      <SearchHeader>
        <HeadingText>Hi {user?.displayName}</HeadingText>

        <SearchButton href={'/search'}>
          <Image src={"/Search_font_awesome.svg.png"} fill />
        </SearchButton>
      </SearchHeader>
      <GainersLosers isPreview={true} />
      <WatchList isPreview={true} />
    </Container>
  );
}

export default page;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 16vh;
  background-color: ${(props) => props.theme.colors.white};
`;
const HeadingText = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  padding: 0;
`;
const SearchContainer = styled.div`
  height: 50px;
  width: 50px;
`;
const SearchButton = styled(Link)`
  background-color: ${(props) => props.theme.colors.white};
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
`;
