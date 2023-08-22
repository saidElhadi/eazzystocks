"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { User } from "@/lib/User";

const WatchList = ({ isPreview }) => {
  const { user } = UserAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [news, setNews] = useState([]); 
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (user?.uid) {
      // console.log("user uid", user.uid);
      User.getUser(user.uid)
        .then((user) => {
          setWatchlist(user.getWatchlist());
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  }, [user]);

  if (isPreview) {
    return (
      <PreviewContainer>
        <PreviewHeader href={"/wachlist"}>Preview </PreviewHeader>
        <>
          {watchlist != [] &&
            watchlist.map((item) => {
              console.log("item: ", item);
              return (
                <div>
                  <PreviewCard
                    symbol={item?.symbol}
                    type={item?.type}
                    tracker={item.tracker}
                  />
                </div>
              );
            })}
        </>
      </PreviewContainer>
    );
  }
  if (!isPreview) {
    return <div>WatchList</div>;
  }
};

export default WatchList;

export const PreviewContainer = styled.div`
  width: 100%;
  min-height: 270px;
  background-color: ${(props) => props.theme.colors.background};
  border: 2px solid green;
`;
export const PreviewHeader = styled(Link)`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text};
  margin: 0;
  padding: 0;
  text-decoration: none;
`;

export const PreviewCard = ({
  symbol,
  price,
  changePrice,
  changePercentage,
}) => {
  // horizontal card
  return (
    <PreviewCardContainer>
      <PreviewImage src={""} />
      <PreviewName href={`/stock/${symbol}`}>{symbol}</PreviewName>
    </PreviewCardContainer>
  );
};

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
