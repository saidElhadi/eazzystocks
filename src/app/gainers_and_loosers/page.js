"use client";
import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { Container, Header } from "./components/styledComponents";

// function page() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=YOUR_API_KEY"
//         );
//         response.json().then((data) => setData(data));
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching the top gainers & losers:", error);
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);
//   if (loading)
//     return (
//       <Container>
//         <p>Loading...</p>
//       </Container>
//     );
//   return (
//     <Container>
//       <Header>Top Gainers & Loosers</Header>
//       <h2>Top Gainers</h2>
//       <ul>
//         {data?.top_gainers?.map((ticker, index) => {
//           console.log(ticker);
//           return (
//             <li key={String(ticker + index)}>
//               {String(ticker.ticker)}: {String(ticker.price)}
//             </li>
//           );
//         })}
//       </ul>
//       <h2>Top Losers</h2>
//       <ul>
//         {data?.top_losers?.map((ticker, index) => (
//           <li key={String(ticker + index)}>
//             {String(ticker.ticker)}: {String(ticker.price)}
//           </li>
//         ))}
//       </ul>
//     </Container>
//   );
// }

// export default page;
// GainersLosers.js
import React, { useEffect, useState } from "react";

function GainersLosers({ isPreview = false }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=YOUR_API_KEY"
        );
        response.json().then((data) => setData(data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the top gainers & losers:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {" "}
      <Link href="/gainers_and_loosers">
        <h2>Top Gainers</h2>
      </Link>
      <ul>
        {data?.top_gainers
          ?.slice(0, isPreview ? 5 : undefined)
          .map((ticker, index) => (
            <Link href={`/gainers_and_loosers/${ticker.ticker}`}>
              <TickerListItem
                key={String(ticker.ticker + index)}
                ticker={ticker}
              >
                {ticker.ticker}: {ticker.price} : {ticker.change_percentage}
              </TickerListItem>
            </Link>
          ))}
      </ul>
      <Link href="/gainers_and_loosers">
        <h2>Top Losers</h2>
      </Link>
      <ul>
        {data?.top_losers
          ?.slice(0, isPreview ? 5 : undefined)
          .map((ticker, index) => (
            <Link href={`/gainers_and_loosers/${ticker.ticker}`}>
              <li key={String(ticker.ticker + index)}>
                {ticker.ticker}: {ticker.price} : {ticker.change_percentage}
              </li>
            </Link>
          ))}
      </ul>
    </>
  );
}

export default GainersLosers;
function TickerListItem({ ticker }) {
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker.ticker}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VENTAGE_APIKEY}}`
        ).then(console.log('firstResponse'))
        const data = await response.json();
        setCompanyDetails(data);

      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    }

    fetchCompanyDetails();
  }, []);

  return (
    <Link href={`/gainers_and_loosers/${ticker.ticker}`}>
      <div>Ticker: {ticker.ticker}</div>
      <div>Price: {ticker.price}</div>
      <div>Change Percentage: {ticker.change_percentage}</div>
      <div>Company Name: {companyDetails?.Name || "Loading..."}</div>
      <div>
        Company Details:{" "}
        {companyDetails?.exchange  ||
          "Loading..."}
      </div>
    </Link>
  );
}
