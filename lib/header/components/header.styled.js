import { Card } from "@/lib/basic_components/card.styled";
import styled from "styled-components";
import { SearchBox, InstantSearch } from "react-instantsearch";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  z-index: 100;

  background-color: ${(props) =>
    props.extended
      ? props.theme.colors.pallet.neutral[100]
      : props.theme.colors.pallet.neutral[0]};
  height: ${(props) =>
    props.extended ? props.theme.units.size.xl : props.theme.units.size.md};
  transition: all 0.5s ease-in-out;
`;
export const Heading = styled.h1`
  position: relative;
  top: 20px;
  left: 15px;
  color: ${(props) => props.theme.colors.pallet.neutral[1000]};
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;
export const SearchCrossButton = styled.div`
  display: ${(props) => (props.extended ? "block" : "none")};
  position: absolute;
  right: 15px;
  top: 15px;
  border: none;
  outline: none;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  padding: 10px;
  &:hover {
    background-color: ${(props) => props.theme.colors.pallet.neutral[200]};
  }
  /* remove all the animation on click */
  &:active {
    background-color: ${(props) => props.theme.colors.pallet.neutral[300]};
  }
`;
export const HeaderSearchBar = styled(SearchBox)`
  .ais-SearchBox-input {
    position: absolute;
    top: 11px;
    left: 13px;
    border: none;
    outline: none;
    width: ${(props) => (props.extended ? "300px" : "0px")};
    visibility: ${(props) => (props.extended ? "visible" : "hidden")};
    /* border: 1px solid ${(props) =>
      props.theme.colors.pallet.neutral[500]}; */
    height: 3rem;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.pallet.neutral[1000]};
    background-color: ${(props) => props.theme.colors.pallet.neutral[0]};
    transition: all 0.4s ease-in;
    &:focus {
      border: 1px solid ${(props) => props.theme.colors.pallet.primary[500]};
      background-color: ${(props) => props.theme.colors.pallet.neutral[0]};
    }
    &::placeholder {
      color: ${(props) => props.theme.colors.pallet.neutral[500]};
    }
    &.ais-SearchBox-reset {
      display: none;
    }
  }
  .ais-SearchBox-submit {
    // inside the search box
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 11px;
    right: 56px;
    border: none;
    outline: none;
    width: ${(props) => (props.extended ? "55px" : "0px")};
    height: ${(props) => (props.extended ? "55px" : "0px")};
    visibility: ${(props) => (props.extended ? "visible" : "hidden")};
    /* border: 1px solid ${(props) =>
      props.theme.colors.pallet.neutral[500]}; */
    height: 3rem;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.pallet.neutral[1000]};
    background-color: ${(props) => props.theme.colors.pallet.neutral[0]};
    transition: all 0.2s ease-in;
  }
  .ais-SearchBox-reset {
    display: none;
    /* display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 28px;
    right: 120px;
    border: none;
    outline: none;
    width: ${(props) => (props.extended ? "fit-content" : "0px")};
    visibility: ${(props) => (props.extended ? "visible" : "hidden")};
    border: none;
    background-color: transparent;
    transition: all 0.2s ease-in; */
  }

  /* position: absolute;
  top: 11px;
  left: 13px;
  border: none;
  outline: none;
  width: ${(props) => (props.extended ? "300px" : "0px")};
  visibility: ${(props) => (props.extended ? "visible" : "hidden")};
  border: 1px solid ${(props) => props.theme.colors.pallet.neutral[500]};
  height: 3rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.pallet.neutral[1000]};
  background-color: ${(props) => props.theme.colors.pallet.neutral[0]};
  transition: all 0.4s ease-in;
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.pallet.primary[500]};
    background-color: ${(props) => props.theme.colors.pallet.neutral[0]};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.pallet.neutral[500]};
  }
  &.ais-SearchBox-reset {
    display: none;

  } */
`;
export const ButtonSearchBarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ResultContainer = styled.div`
  list-style: none;
  position: absolute;
  overflow: scroll;
  width: fit-content;
  top: 75px;
  display: flex;
  align-items: center;
  overflow: scroll;
  justify-content: space-between;
  width: 100%;
  // hide scoll bar in all browser
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; 
  /* .ais-Hits-list {
    display: none;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .ais-Hits-item {
    display: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0;
    margin: 0;
  } */


`;
export const ResultCard = styled(Card)`
  /* display: ${(props) => (props.extended ? "flex" : "none")}; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 90px;
  min-height: 90px;
  margin: 15px;
  color: black;
  &:hover {
    box-shadow: 0px 0px 20px 0px ${(props) => props.theme.colors.card.border};
  }
  &:active {
    box-shadow: 0px 0px 10px 0px ${(props) => props.theme.colors.card.border};
  }
  &:focus {
    box-shadow: 0px 0px 10px 0px ${(props) => props.theme.colors.card.border};
  }
  transition: all 0.2s ease-in;
  & > h1 {
    font-size: 0.5rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.pallet.neutral[1000]};
    margin: 0;
    padding: 0;
  }
  & > h2 {
    font-size:0.8rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.pallet.neutral[1000]};
    margin: 0;
    padding: 0;
  }
`;
export const ButtonSearchBarCardContainer = styled(Card)`
  height: ${(props) => (props.extended ? props.theme.units.size.xl : "70px")};
  width: ${(props) => (props.extended ? "370px" : "70px")};
  border-radius: ${(props) =>
    props.extended
      ? props.theme.units.radius["default"]
      : props.theme.units.radius["full"]};

  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
  flex-direction: column;
  align-items: right;
  justify-content: right;

  background-color: ${(props) =>
    props.extended
      ? props.theme.colors.pallet.neutral[100]
      : props.theme.colors.pallet.neutral[0]};
  transition: all 0.5s ease-in-out;
`;
export const PreviewImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
  object-position: center;
  background-color: ${(props) => props.theme.colors.pallet.neutral[100]};
`;
