// card container
"use client";
import styled from "styled-components";
import { Box } from "./box.styled";

export const Card = styled(Box)`
  background-color: ${(props) => props.theme.colors.card.background};
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 0px 0px 0px ${(props) => props.theme.colors.card.border};
  transition: all 200 ease-in-out;
  &:hover {
    box-shadow: 0px 0px 5px 0px ${(props) => props.theme.colors.card.border};
  }
  &:active {
    box-shadow: 0px 0px 0px 0px ${(props) => props.theme.colors.card.border};
  }
  &:focus {
    box-shadow: 0px 0px 0px 0px ${(props) => props.theme.colors.card.border};
  }
`;
export const SquareCard = styled(Card)`
  height: ${props => props.theme.units.size[props.width ? props.width : "full"]};
`;
export const CircleCard = styled(Card)`
  border-radius: ${props => props.theme.units.radius["full"]};;
`;

export const RectangleCard = styled(Card)``;
