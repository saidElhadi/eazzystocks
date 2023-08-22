"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { User } from "@/lib/User";
import {
  getCompanyOverview,
  getMultipleCompanyOverviews,
  serachSymbol,
} from "@/lib/getDataFromAPI";
import {
  FinancialAsset,
  getFinancialAssetFromSymbolType,
} from "@/lib/FinancialAsset";
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

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //       // not sure if its gonna work everyt time or it need to be in a seperate useEffect
  //       User.getUser(user.uid)
  //         .then((user) => {
  //           setUserObject(user);
  //         })
  //         .catch((error) => {
  //           // console.log(error);
  //         });
  //       if (user?.uid) {
  //       }
  //     }
  //     if (!user) {
  //       router.push("/login");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  return (
    <div>
      logged in as {user?.displayName}
      <br />
      user object {user?.displayName}
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
          return (
            <div key={index} style={{border: 'dashed red'}}> 
              {item.symbol + " - " + item.type + " - " + item.tracker}
              <br/>
              <button
                onClick={() => {
                  user.removeFromWatchlist(item.symbol);
                  console.log();
                  setRefresh(!refresh);
                }}
              >
                remove
              </button>
              {/* get company info */}
              <button
                onClick={() => {
                  item.getCompanyInfo().then((data) => {
                    console.log("test get data", data);
                  });
                }}
              >
                get data
              </button>
              {/* get stock last price */}
              <button
                onClick={() => {
                  item.getLatestPrice().then((data) => {
                    console.log("test get data", data);
                  });
                }}
              >
                get last price data
              </button>
            </div>
          );
        })}
      </div>
      {/* // get all wachlist items getMultipleCompanyOverviews */}
      <div>
        <button
          onClick={() => {
            getMultipleCompanyOverviews(
              user?.getWatchlist()?.map((item) => item.symbol)
            ).then((data) => {
              // console.log('test in get all data')
              console.log("test get data", data);
            });
          }}
        >
          get all data
        </button>
      </div>
      {/* serach symbol */}
      <>
        <input ref={inputSearchRef} type="text" />
        <button
          onClick={() => {
            serachSymbol(inputRef.current.value).then((data) => {
              console.log("test get data", data);
            });
          }}
        >
          get data
        </button>
      </>
    </div>
  );
}

export default page;

// watchlist components, renders everytime user.watchlist changes
