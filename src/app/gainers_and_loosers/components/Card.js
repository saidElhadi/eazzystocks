import {
  ContainerPreviewCard,
  PreviewImage,
  PreviewName,
  PreviewPrice,
  PreviewContainerChange,
  PreviewChangePercent,
  PreviewChangePrice,
} from "./styledComponents";

export const Card = ({
  name,
  price,
  currency = "$",
  changePercent,
  changeCurrency,
  up = true,
}) => {
  return (
    <ContainerPreviewCard>
      <PreviewImage></PreviewImage>
      <PreviewName>{name}</PreviewName>
      <PreviewPrice>{price + currency}</PreviewPrice>
      <PreviewContainerChange>
        <PreviewChangePercent up={up}>{changePercent}</PreviewChangePercent>
        <PreviewChangePrice>
          {String(changeCurrency) + currency}
        </PreviewChangePrice>
      </PreviewContainerChange>
    </ContainerPreviewCard>
  );
};
