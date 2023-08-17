
import { doc, getDoc } from "firebase/firestore";
import { firestore_db } from "@/firebase/config";
import { useState } from "react";

export const testDb = () => {
  getDoc(
    doc(firestore_db, "financial_instruments_record", "BRyNObjurnu1kFZB7ejH")
  ).then(
    (temp) => { console.log(temp.data()) }
  )
};
