"use client";
import React from "react";
import { Container } from "../../../../lib/basic_components/container.styled";
import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import Link from "next/link";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGORIA_APPID,
  process.env.NEXT_PUBLIC_ALGORIA_SERCH_APIKEY
);
const queryHook = (query, search) => {
  console.log(query);
  search(query);
};
function Hit({ hit }) {
  // check how long it takes to get the results
  console.log(hit);
  return (
    <div>
      <Link href={`/stock/${hit.symbol}`}>
        {hit.symbol}
      </Link>

      <p>{hit.security_name}</p>
    </div>
  );
}

function page() {
  return (
    <Container>
      <InstantSearch searchClient={searchClient} indexName="financial_assets">
        <SearchBox queryHook={queryHook} />
        <Hits
          // Optional props
          hitComponent={Hit}
        />
      </InstantSearch>
    </Container>
  );
}

export default page;
