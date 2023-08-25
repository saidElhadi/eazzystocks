"use client";
import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.pallet.neutral[100]};
  color: ${(props) => props.theme.colors.pallet.neutral[800]};
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 101;
  display: block;
  margin: 0 auto;
  flex-direction: column;
  margin: 0 auto;
`;
export const Header = styled.h1`
  max-width: 350px;
  align-self: center;
  margin: 0 auto;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const ContainerPreview = styled.div`
  border: 2px solid red;
  height: 170px;
  width: 100%;
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
`;

// each element has a name
export const PreviewImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
  object-position: center;
  border: 2px solid blue;
  background-color: blue;
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
  color: ${(props) => props.up? props.theme.colors.pallet.green : props.theme.colors.pallet.red};
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