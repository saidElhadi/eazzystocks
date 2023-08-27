import {
  ContainerPreviewCard,
  PreviewImage,
  PreviewName,
  PreviewPrice,
  PreviewContainerChange,
  PreviewChangePercent,
  PreviewChangePrice,
} from "./gainers_and_loosers.styled";

export const Card = ({
  src,
  name,
  price,
  currency = "$",
  changePercent,
  changeCurrency,
  up,
}) => {
  // fetch the src and check if theres an image or not
  // if there is no image, then use a default image
  // if there is an image, then use the image
  // if there is an image, but the image is broken, then use a default image
  const defaultImage = "https://storage.googleapis.com/iex/api/logos/AAPL.png";
  
  return (
    <ContainerPreviewCard>
      <PreviewImage src={src} />
      <PreviewName>{name}</PreviewName>
      <PreviewPrice>{parseFloat(price).toFixed(2) + currency}</PreviewPrice>
      <PreviewContainerChange>
        <PreviewChangePercent up={up}>
          {parseFloat(changePercent).toFixed(2)}%
        </PreviewChangePercent>
        <PreviewChangePrice>
          {String(parseFloat(changeCurrency).toFixed(2)) + currency}
        </PreviewChangePrice>
      </PreviewContainerChange>
    </ContainerPreviewCard>
  );
};
