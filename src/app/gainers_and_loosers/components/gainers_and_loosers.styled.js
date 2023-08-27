"use client";
import styled from "styled-components";
import Link from "next/link";

// Preview Components
export const PreviewSectionContainer = styled.div`
  display: flex;
  height: 250px;
  flex-direction: column;
  justify-content: space-around;
 margin: 0 auto;
`
export const ContainerPreview = styled.div`
  height: 170px;
  width: 350px;
  min-width: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
export const ContainerPreviewCard = styled.div`
  height: 160px;
  width: 160px;
  background-color: ${(props) => props.theme.colors.card.background};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
export const PreviewImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
  object-position: center;
  /* border: 2px solid ${(props) => props.theme.colors.pallet.neutral[100]}; */
`;
export const PreviewName = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.card.text};
`;
export const PreviewPrice = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.pallet.neutral[800]};
`;
export const PreviewContainerChange = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  width: 100%;
  margin: 0 auto;
  padding: 0 0 0 0;
`;
export const PreviewChange = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.card.text};
  border-radius: 5px;
  height: 60%;
  width: auto;
  padding: 0 0.1rem 0 0.1rem;
  display: flex;
  align-items: center;
`;
export const PreviewChangePercent = styled(PreviewChange)`
  color: ${(props) =>
    props.up
      ? props.theme.colors.pallet.green[500]
      : props.theme.colors.pallet.red[500]};
`;
export const PreviewChangePrice = styled(PreviewChange)`
  color: ${(props) => props.theme.colors.pallet.neutral[400]};
`;
export const PreviewHeader = styled(Link)`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.pallet.neutral[800]};
  margin: 0;
  padding: 0;
  text-decoration: none;
`;

// Page Components
export const BoardContainer = styled.div`
  column-gap: 0.1rem;
  min-height: 200px;

  width: ${(props) => props.width || "90%"};
  max-width: 450px;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 30px;

  background-color: ${(props) => props.theme.colors.card.background};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;
export const GainerElement = styled.div`
  height: ${(props) => props.theme.units.size.sm};
  max-width: 100%;
  background-color: ${(props) =>
    props.theme.colors.pallet.green[1000 - 50 * props.rank]};
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 0 0 0rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.pallet.neutral[100]};
  text-shadow: 0 0 5px ${(props) => props.theme.colors.pallet.neutral[800]};
  text-decoration: none;
  text-align: left;
`;
export const LooserElement = styled.div`
  height: ${(props) => props.theme.units.size.sm};
  width: 100%;
  background-color: ${(props) =>
    props.theme.colors.pallet.red[1000 - 50 * props.rank]};
  margin: 0 auto;
  justify-content: space-evenly;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0 0 0rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.pallet.neutral[100]};
  text-shadow: 0 0 5px ${(props) => props.theme.colors.pallet.neutral[800]};
  text-decoration: none;
  text-align: left;
`;
