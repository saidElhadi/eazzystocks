"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { UserAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { User } from "@/lib/User";

import { FinancialAsset } from "@/lib/FinancialAsset";
function page() {
  const { logOut } = UserAuth();
  const [userObject, setUserObject] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const inputRef = useRef(null);
  const inputSearchRef = useRef(null);
  const router = useRouter();

  const { user } = UserAuth();

  useEffect(() => {
    if (user?.uid && !userObject) {
      // console.log("user uid", user.uid);
    }
  }, [user]);

  return (
    <div>
      logged in as {user?.displayName}
      <br />
      user uid {String(user?.uid).slice(0, 10)}
      <br />
      <br />
      <button
        onClick={() => {
          logOut();
        }}
      >
        Log out
      </button>
      <br />
      <button
        onClick={() => {
          // console.log("user object", user);
        }}
      >
        Log user object
      </button>
      <br />
      <input ref={inputRef} type="text" />
      <button
        onClick={() => {
          user?.addToWatchlist({
            symbol: inputRef.current.value,
            type: "Stock",
          });
          inputRef.current.value = "";
          setRefresh(!refresh);
        }}
      >
        add the input to wachlist
      </button>
      {/* map wachlist */}
      <div>
        {user?.getWatchlist()?.map((item, index) => {
          console.log("map watchlist item", item.symbol, item.tracker);
          let stockk = new FinancialAsset(item.symbol, item.type, item.tracker);
          return (
            <div key={index} style={{ border: "dashed red" }}>
              {item.symbol + " - " + item.type + " - " + item.tracker}
              <br />
              <button
                onClick={() => {
                  user.removeFromWatchlist(item.symbol);
                  console.log();
                  setRefresh(!refresh);
                }}
              >
                remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
