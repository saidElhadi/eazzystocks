import { firestore_db } from "@/firebase/config";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FinancialAsset, getFinancialAsset } from "./FinancialAsset";

export class User {
  constructor(uid, displayName, email, phone, photoURL, watchlist) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.phone = phone;
    this.photoURL = photoURL;
    this.watchlist = watchlist?.length > 0 ? watchlist : [];
  }
  // getters
  getUid() {
    return this.uid;
  }
  getDisplayName() {
    return this.displayName;
  }
  getEmail() {
    return this.email;
  }
  getPhone() {
    return this.phone;
  }
  getPhotoURL() {
    return this.photoURL;
  }
  getWatchlist() {
    if (this.watchlist) {
      if (this.watchlist.length > 0) {
        let temp = [];
        this.watchlist.map((item) => {
          console.log("in user return watchlist", temp);
          if (item?.symbol) {
            temp.push(getFinancialAsset(item.symbol, item.type, item.tracker));
          }
        });
        return temp;
      }
      return [];
    }
  }
  async updateTracker(symbol) {
    console.log("update tracker", symbol);
    let temp = this.watchlist.filter((item) => item?.symbol == symbol);
    console.log("update tracker", temp);
    if (temp?.length > 0) {
      temp[0].tracker = new Date();
      console.log("update tracker", temp);
      const userRef = doc(firestore_db, "users", this.uid).withConverter(
        userConverter
      );
      updateDoc(userRef, {
        watchlist: this.watchlist,
      }).then(() => {
        console.log("updated watchlist");
      });
    }
  }
  async removeTracker(symbol) {
    console.log("remove tracker", symbol);
    let temp = this.watchlist.filter((item) => item?.symbol == symbol);
    console.log("remove tracker", temp);
    if (temp?.length > 0) {
      temp[0].tracker = null;
      console.log("remove tracker", temp);
      const userRef = doc(firestore_db, "users", this.uid).withConverter(
        userConverter
      );
      updateDoc(userRef, {
        watchlist: this.watchlist,
      }).then(() => {
        console.log("updated watchlist");
      });
    }
  }
  async addToWatchlist(item_to_add) {
    if (typeof item_to_add !== "object") {
      throw new Error("item_to_add must be an object");
    }

    const asset = getFinancialAsset(
      item_to_add.symbol,
      item_to_add.type,
      item_to_add.tracker
    );

    // Check if item exists in watchlist
    const existsInWatchlist = this.watchlist.some(
      (item) => item.symbol === asset.symbol
    );
    console.log(
      "existsInWatchlist",
      existsInWatchlist,
      asset.symbol,
      asset.tracker,
      this.watchlist
    );
    if (!existsInWatchlist) {
      this.watchlist.push(asset.toWatchlist());
    }

    const userRef = doc(firestore_db, "users", this.uid);

    await updateDoc(userRef, {
      watchlist: arrayUnion(asset.toWatchlist()),
    }).catch((error) => {
      console.log(error);
    });

    return this.watchlist;
  }
  removeFromWatchlist(item_to_remove) {
    console.log("remove from watchlist", item_to_remove, this.watchlist);
    // filter the item out of the watchlist
    this.watchlist = this.watchlist.filter(
      (item) => item && item.symbol !== item_to_remove
    );

    console.log("remove from watchlist", this.watchlist);
    // update firebase
    const userRef = doc(firestore_db, "users", this.uid).withConverter(
      userConverter
    );
    updateDoc(userRef, {
      watchlist: this.watchlist,
    }).then(() => {
      console.log("updated watchlist");
    });
  }
  getItemFromWatchlist(symbol) {
    let temp = this.watchlist.filter((item) => item?.symbol == symbol);
    console.log("User, getItemFromWatchlist", temp);
    if (temp?.length > 0) {
      return getFinancialAsset(temp[0].symbol, temp[0].type, temp[0].tracker);
    } else {
      return null;
    }
  }
  checkIfInWatchlist(symbol) {
    let temp = this.watchlist.filter((item) => item?.symbol == symbol);
    console.log("User, checkIfInWatchlist", temp);
    if (temp?.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  async updateLastSignIn() {
    const userRef = doc(firestore_db, "users", this.uid).withConverter(
      userConverter
    );
    updateDoc(userRef, {
      last_sign_in: new Date(),
    });
  }
  // search user via uid and return user object
  static async getUser(uid) {
    const userSnap = await this.getFirebaseSnap(uid);

    if (userSnap.exists()) {
      console.log("user found");
      let data = userSnap.data();
      let temp = new User(
        data.uid,
        data.displayName,
        data.email,
        data.phone,
        data.photoURL,
        data.watchlist
      );
      return temp;
    } else {
      console.log("user not found");
      return null;
    }
  }
  static async getFirebaseSnap(uid) {
    const userRef = doc(firestore_db, "users", uid).withConverter(
      userConverter
    );
    const userSnap = await getDoc(userRef);
    return userSnap;
  }
  async getThisFirebaseSnap() {
    const userRef = doc(firestore_db, "users", this.uid).withConverter(
      userConverter
    );
    const userSnap = await getDoc(userRef);
    return userSnap;
  }
}
export const userConverter = {
  toFirestore: function (user) {
    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phone: user.phone,
      photoURL: user.photoURL,
      watchlist: user.watchlist,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new User(
      data.uid,
      data.displayName,
      data.email,
      data.phone,
      data.photoURL,
      data.watchlist
    );
  },
};
