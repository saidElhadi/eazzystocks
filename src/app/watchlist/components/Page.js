import { UserAuth } from "@/lib/context/AuthContext";
import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { StockCard } from "@/lib/stock_card/StockCard";
import { Container } from "@/lib/basic_components/container.styled";
import Header from "@/lib/header/Header";
import { Card } from "@/lib/basic_components/card.styled";
import Image from "next/image";
import deleteIcon from "@/public/delete.svg";
import trackIcon from "@/public/tracker.svg";
import removeTrackerIcon from "@/public/remove_tracker.svg";

const Page = () => {
  const { user } = UserAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [refresh, setRefresh] = useState(null);

  useEffect(() => {
    if (user?.watchlist) {
      setWatchlist(user?.watchlist);
    }
  }, [user?.watchlist]);

  return (
    <Container>
      <Header title={"Watchlist"}/>
      {watchlist?.map((stock, index) => {
        let local_stock = user.getItemFromWatchlist(stock.symbol);
        return (
          local_stock && (
            <WatchlistContainer>
              <StockCard
                symbol={local_stock.symbol}
                key={index}
                onClick={() => {
                  setRefresh(!refresh);
                }}
              />
              <EditMenuContainer>
                <Image
                  width={35}
                  src={deleteIcon}
                  alt="delete"
                  onClick={() => {
                    user?.removeFromWatchlist(local_stock.symbol);
                    setRefresh(!refresh);
                  }}
                />
                <Image
                  width={35}
                  src={stock.tracker != null ? removeTrackerIcon : trackIcon}
                  alt="add tracker"
                  onClick={() => {
                    if (stock.tracker != null) {
                      user?.removeTracker(local_stock.symbol);
                    } else {
                      user?.updateTracker(local_stock.symbol);
                    }
                    setRefresh(!refresh);
                  }}
                />
              </EditMenuContainer>
            </WatchlistContainer>
          )
        );
      })}
    </Container>
  );
};

export default Page;

const WatchlistContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EditMenu = ({ symbol }) => {
  const [tracked, setTracked] = useState(false);
  const { user } = UserAuth();

  return (
    <EditMenuContainer>
      <Image
        width={35}
        src={deleteIcon}
        alt="delete"
        onClick={() => {
          user?.removeFromWatchlist(symbol);
        }}
      />
      <Image
        width={35}
        src={tracked ? removeTrackerIcon : trackIcon}
        alt="add tracker"
        onClick={() => {
          setTracked(!tracked);
        }}
      />
    </EditMenuContainer>
  );
};

const EditMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50px;
`;
