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
  name,
  price,
  currency = "$",
  changePercent,
  changeCurrency,
  up,
}) => {

  return (
    <ContainerPreviewCard>
      <PreviewImage></PreviewImage>
      <PreviewName>{name}</PreviewName>
      <PreviewPrice>{parseFloat(price).toFixed(2) + currency}</PreviewPrice>
      <PreviewContainerChange>
        <PreviewChangePercent up={up}>{parseFloat(changePercent).toFixed(2)}%</PreviewChangePercent>
        <PreviewChangePrice>
          {String(parseFloat(changeCurrency).toFixed(2)) + currency}
        </PreviewChangePrice>
      </PreviewContainerChange>
    </ContainerPreviewCard>
  );
};
