import React from "react";
import Link from "next/link";
function SearchBar() {
  const searchClient = algoliasearch(
    process.env.ALGORIA_APPID,
    process.env.ALGORIA_SERCH_APIKEY
  );
  function Hit({ hit }) {
    // check how long it takes to get the results
    console.log(hit);
    return (
      <div>
        <Link href={`/stock/${hit.symbol}`}>{hit.symbol}</Link>
        <p>{hit.security_name}</p>
      </div>
    );
  }
  const queryHook = (query, search) => {
    console.log(query);
    search(query);
  };
  return (
    <>search bar empty</>
    // <SearchHeader>
    //     <HeadingText>Hi {user?.displayName}</HeadingText>
    //     <StyledInstantSearch
    //       searchClient={searchClient}
    //       indexName="financial_assets"
    //     >
    //       <StyledSearchBox queryHook={queryHook} />
    //     </StyledInstantSearch>
    //     <StyledInstantSearch
    //       searchClient={searchClient}
    //       indexName="financial_assets"
    //     >
    //       <StyledHits
    //         // Optional props
    //         hitComponent={Hit}
    //       />
    //     </StyledInstantSearch>
    //   </SearchHeader>
  );
}

export default SearchBar;
