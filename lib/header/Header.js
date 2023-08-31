"use client";
import React, { useState } from "react";
// Styled Components
import {
  ButtonSearchBarCardContainer,
  ButtonSearchBarContainer,
  HeaderContainer,
  HeaderSearchBar,
  Heading,
  PreviewImage,
  ResultCard,
  ResultContainer,
  SearchCrossButton,
} from "./components/header.styled";
// Images/SVG
import search from "@/public/search.svg";
import cross from "@/public/cross.svg";
import Image from "next/image";
// Search
import { Hits, InstantSearch, SearchBox, useHits } from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";
import Link from "next/link";

const Header = ({ title }) => {
  const [state, setState] = useState(false);
  const queryHook = (query, search) => {
    console.log(query);
    search(query);
  };
  const Hit = ({ hit }) => {
    console.log("test hit function");
    console.log(hit);
    return <div>test</div>;
  };
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGORIA_APPID,
    process.env.NEXT_PUBLIC_ALGORIA_SERCH_APIKEY
  );
  function CustomHits(props) {
    const { hits, results, sendEvent } = useHits(props);
    return (
      <ResultContainer>
        {hits.map((hit) => (
          <ResultCard key={hit.objectID}>

            <PreviewImage
              src={`https://financialmodelingprep.com/image-stock/${hit.symbol}.jpg`}
              alt="stock"
            />

            <Link
              style={{
                textDecoration: "none",
                textAlign: "center",
                width: "100%",
                fontSize: "0.7rem",
                color: "black",
                fontWeight: "bold",
                lineHeight: "1.2",
              }}
              href={`/stock/${hit.symbol}`}
            >
              {hit.company_name}
            </Link>
          </ResultCard>
        ))}
      </ResultContainer>
    );
  }
  return (
    <InstantSearch searchClient={searchClient} indexName="financial_assets">
      <HeaderContainer>
        <Heading>{title}</Heading>
        <ButtonSearchBarCardContainer extended={state}>
          <ButtonSearchBarContainer
            searchClient={searchClient}
            indexName="financial_assets"
          >
            {/* Search bar extends SearchBox*/}
            <HeaderSearchBar
              queryHook={queryHook}
              extended={state}
              type="search"
            />
            {/* Search button */}
            <SearchCrossButton
              extended={!state}
              onClick={() => setState(!state)}
            >
              <Image src={search} alt="search" fill />
            </SearchCrossButton>
            <SearchCrossButton
              extended={state}
              onClick={() => setState(!state)}
            >
              <Image src={cross} alt="search" fill />
            </SearchCrossButton>
          </ButtonSearchBarContainer>

          <CustomHits />
        </ButtonSearchBarCardContainer>
      </HeaderContainer>
    </InstantSearch>
  );
};

export default Header;
