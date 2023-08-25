'use client'
import styled from 'styled-components';
import Link from 'next/link';

export const PreviewCardContainer = styled.div`
  height: 100%;
  max-width: 340px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.card.background};
  border-radius: 10px;
  border: 2px solid blue;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 0rem 0rem 0.5rem;
  margin: 0.5rem auto;
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
export const PreviewName = styled(Link)`
text-decoration: none;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.card.text};
`;
export const PreviewContainer = styled.div`
  width: 100%;
  min-height: 270px;
  background-color: ${(props) => props.theme.colors.pallet.neutral[100]};
`;
export const PreviewHeader = styled(Link)`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.pallet.neutral[800]};
  margin: 0;
  padding: 0;
  text-decoration: none;
`;