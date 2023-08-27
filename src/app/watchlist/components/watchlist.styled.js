'use client'
import styled from 'styled-components';
import Link from 'next/link';
import { Card } from '@/lib/basic_components/card.styled';

export const PreviewContainer = styled.div`
  height: 100%;
  width: 340px;
  margin: 0 auto; 
  min-height: 70px;
  background-color: ${(props) => props.theme.colors.pallet.neutral[100]};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const StockCardContainer = styled(Card)`
  justify-content: space-evenly;
  align-items: center;
  height: 75px;
  margin: 10px 0;
`;

// each element has a name
export const PreviewImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
  object-position: center;
  background-color: blue;
`;

export const PreviewName = styled.div`
text-decoration: none;
color: ${(props) => props.theme.colors.pallet.neutral[800]};
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.card.text};
`;
export const PreviewPriceChange = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.pallet.neutral[800]};
  margin: 0;
`
export const PreviewPrecentageChange = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.pallet.neutral[800]};
  margin: 0;

`
export const PreviewHeader = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.pallet.neutral[800]};
  margin: 0;
  padding: 0;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;