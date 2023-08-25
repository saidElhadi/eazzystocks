import { writeBatch, doc } from "firebase/firestore"; 
import data from "./data.json" assert { type: "json" };

const firestore_db = getFirestore();

const batch = writeBatch(firestore_db);

const collectionRef = collection(firestore_db, "financial_assets");

data.forEach((doc) => {
    const docRef = doc(collectionRef, doc.symbol);
    batch.set(docRef, doc);
    }
);

batch.commit().then(() => {
    console.log("done");
}
);
