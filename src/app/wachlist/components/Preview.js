import React from 'react'
import { PreviewCardContainer, PreviewContainer, PreviewHeader, PreviewImage, PreviewName } from './watchlist.styled';
import Link from 'next/link';

const Preview = ({watchlist}) => {
  return (
    <PreviewContainer>
        <Link style={{ textDecoration: "none", color: 'grey'}} href={"/watchlist"}>
          <h2>Watchlist</h2>
        </Link>
        {watchlist.map((stock) => (
          <PreviewCard
            key={stock.symbol}
            symbol={stock.symbol}
            price={stock.price}
            changePrice={stock.changePrice}
            changePercentage={stock.changePercentage}
          />
        ))}

      </PreviewContainer>
  )
}

export default Preview

export const PreviewCard = ({
    symbol,
    price,
    changePrice,
    changePercentage,
  }) => {
    // horizontal card
    return (
      <PreviewCardContainer>
        <PreviewImage src={""} />
        <PreviewName href={`/stock/${symbol}`}>{symbol}</PreviewName>
      </PreviewCardContainer>
    );
  };
  
  