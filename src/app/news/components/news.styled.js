import { Card } from "@/lib/basic_components/card.styled";
import Link from "next/link";
import styled from "styled-components";

export const NewsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
`;
export const NewsCard = styled(Card)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 350px;
  margin: 10px auto;
  height: 100px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  justify-content: space-between;
`;
export const NewsCardImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
export const NewsCardTitle = styled.div`
  font-size: 1rem;
  text-align: center;
  font-weight: 600;
`;
export const NewsCardSubtitle = styled.div`
  font-size: 0.4rem;
`;
export const NewsCardLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
