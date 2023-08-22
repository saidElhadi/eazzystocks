"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, firestore_db } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "@/lib/User";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(new User());
  const [wachlist, setWachlist] = useState(null); 
  const [refresh, setRefresh] = useState(false);
  const logOut = () => {
    signOut(auth).catch((error) => {
      // console.log(error);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(firestore_db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          if (userSnap.data().last_sign_in) {
            console.log(
              "usr last log in" + userSnap.data().last_sign_in.toDate()
            );
          }
          if (userSnap.data().displayName == null) {
            console.log("auth context updating profile");
            await updateProfile(user, { displayName: userSnap.data().name });
          }
          const { displayName, email, photoURL, uid, phone, watchlist } = userSnap.data();
          setUser(new User(uid, displayName, email, phone, photoURL, watchlist));
        } else {
          const { displayName, email, photoURL, uid, phoneNumber } = user;
          const newUser = {
            displayName,
            email,
            phoneNumber,
            photoURL,
            uid,
            sign_up: new Date(),
            last_sign_in: new Date(),
            wachlist: [],
          };
          await setDoc(userRef, newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        wachlist,
        logOut,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
