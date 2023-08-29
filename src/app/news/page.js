'use client'
import React, {useState, useEffect} from "react";
import {Preview} from './components/Preview'
import {Page} from './components/Page'
import { getNewsBySymbol } from "@/lib/getDataFromAPI";

const News = ({isPreview, ticker = null}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (ticker) {
      getNewsBySymbol(ticker).then((data) => {
        setData(data);
      });
    }
  }, [ticker]);


  if (isPreview) {
    return <Preview data={data} />;
  }
  if (!isPreview) {
    return <Page data={data} />;
  }
};

export default News;
