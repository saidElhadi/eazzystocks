"use client";
import React from "react";
import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import Link from "next/link";

export const searchClient = algoliasearch(
  process.env.ALGORIA_APPID,
  process.env.ALGORIA_SERCH_APIKEY
);
export const queryHook = (query, search) => {
  console.log(query);
  search(query);
};
export const Hit = ({ hit }) => {
    console.log(hit)
  return <></>;
};

