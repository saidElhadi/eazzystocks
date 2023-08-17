"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore_db } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const logOut = () => {
  //   signOut(auth).catch((error) => {
  //     // console.log(error);
  //   });
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(firestore_db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          const { displayName, email, photoURL, uid } = user;
          const newUser = {
            displayName,
            email,
            photoURL,
            uid,
            createdAt: new Date(),
            updatedAt: new Date(),
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
        // logOut,
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
