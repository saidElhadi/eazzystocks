import React from 'react'
import { PreviewCardContainer, PreviewContainer, PreviewHeader, PreviewImage, PreviewName } from './watchlist.styled';

const Preview = ({watchlist}) => {
  return (
    <PreviewContainer>
        <PreviewHeader href="/watchlist">Watchlist</PreviewHeader>
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
  
  