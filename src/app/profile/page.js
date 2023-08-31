"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { UserAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { User } from "@/lib/User";

import { FinancialAsset } from "@/lib/FinancialAsset";
import { getPerformance } from "@/lib/stockPerformance";
import {
  calculatePerformanceFromSpecificDate,
  fetchCustomRangeData,
  formatDate,
} from "@/lib/getDataFromAPI";
function Page() {
  const { logOut } = UserAuth();
  const [userObject, setUserObject] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const inputRef = useRef(null);
  const inputSearchRef = useRef(null);
  const router = useRouter();

  const [priceChange, setPriceChange] = useState([]);
  const [percentageChange, setPercentageChange] = useState([]);

  const { user } = UserAuth();

  useEffect(() => {
    if (user?.uid && !userObject) {
      console.log(user);
      user.getThisFirebaseSnap().then((data) => {
        console.log(data.data());
      });
    }
  }, [user]);
  useEffect(() => {
    user?.watchlist.forEach((elem) => {
      if (elem.tracker != null) {
        fetchCustomRangeData(elem.symbol, elem.tracker).then((data) => {
          console.log(data);
          try {
            setPriceChange([...priceChange, data.change]);
            setPercentageChange([...percentageChange, data.changeInPercentage]);
          } catch (error) {}
        });
      }
    });
  }, []);

  return (
    <div>
      <img src={user.photoURL} alt="ProfileImg" />
      <h3>{user.displayName}</h3>
      <p>{user.email}</p>
      beta portfolio
      <br />
      gains/losses sum {priceChange}
      <br />
      gains/losse percentage {percentageChange}
      <br />
      {priceChange.map((elem) => {
        return <>{elem}</>;
      })}
      <br />
      {percentageChange.map((elem) => {
        return <>{elem}</>;
      })}
    </div>
  );
}

export default Page;
// <div>
//   logged in as {user?.displayName}
//   <br />
//   user uid {String(user?.uid).slice(0, 10)}
//   <br />
//   <br />
//   <button
//     onClick={() => {
//       logOut();
//     }}
//   >
//     Log out
//   </button>
//   <br />
//   <button
//     onClick={() => {
//       // console.log("user object", user);
//     }}
//   >
//     Log user object
//   </button>
//   <br />
//   <input ref={inputRef} type="text" />
//   <button
//     onClick={() => {
//       user?.addToWatchlist({
//         symbol: inputRef.current.value,
//         type: "Stock",
//       });
//       inputRef.current.value = "";
//       setRefresh(!refresh);
//     }}
//   >
//     add the input to watchlist
//   </button>
//   {/* map watchlist */}
//   <div>
//     {user?.getWatchlist()?.map((item, index) => {
//       fetchCustomRangeData(item.symbol, item.tracker);
//       return (
//         <div key={index} style={{ border: "dashed red" }}>
//           {item.symbol + " - " + item.type + " - " + item.tracker}
//           <br />
//           <button
//             onClick={() => {
//               user.removeFromWatchlist(item.symbol);
//               console.log();
//               setRefresh(!refresh);
//             }}
//           >
//             remove
//           </button>
//         </div>
//       );
//     })}
//   </div>
//   <br />
//   <br />
//   <br />
//   <br />
//   <div>

//   </div>
// </div>
