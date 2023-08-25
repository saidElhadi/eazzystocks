"use client";
import React, { useState } from "react";
// Styled Components
import {
  ButtonSearchBarCardContainer,
  ButtonSearchBarContainer,
  HeaderContainer,
  HeaderSearchBar,
  Heading,
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
import { searchClient } from "@/lib/search.algoria";

const Header = () => {
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
  function CustomHits(props) {
    const { hits, results, sendEvent } = useHits(props);
    console.log(hits ? hits : "no hits");
    return (
      <ResultContainer>
        {hits.map((hit) => (
          <ResultCard key={hit.objectID}>
            <Link href={`/stock/${hit.symbol}`}>{hit.company_name}</Link>
          </ResultCard>
        ))}
      </ResultContainer>
    );
  }
  return (
    <InstantSearch searchClient={searchClient} indexName="financial_assets">
      <HeaderContainer>
        <Heading>Dashboard</Heading>
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
