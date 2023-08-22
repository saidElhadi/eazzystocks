import { firestore_db } from "@/firebase/config";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FinancialAsset, getFinancialAsset } from "./FinancialAsset";

export class User {
  constructor(uid, displayName, email, phone, photoURL, watchlist) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.phone = phone;
    this.photoURL = photoURL;
    this.watchlist = watchlist;
    localStorage.setItem("watchlist", JSON.stringify(this.watchlist));
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
          // console.log('in user return wachlist',temp);
          temp.push(getFinancialAsset(item.symbol, item.type, item.tracker));
        });
        return temp;
      }
      return [];
    }
  }
  // handle wachlish crud operations
  async addToWatchlist(item_to_add) {
    if (typeof item_to_add !== "object") {
      throw new Error("item_to_add must be an object");
    }
    console.log("debug add to watchlist", item_to_add);
    let temp = getFinancialAsset(item_to_add.symbol, item_to_add.type);
    console.log("debug add to watchlist", temp);
    // remove duplicates
    this.watchlist = this.watchlist?.filter(
      (item) => item.symbol !== temp.symbol
    );

    this.watchlist.push(temp.toWatchlist());

    // update firebase
    if (this.watchlist) {
      const userRef = doc(firestore_db, "users", this.uid);
      updateDoc(userRef, {
        watchlist: this.watchlist,
      })
        .then(() => {
          console.log("updated watchlist");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // update local storage
    window.localStorage.setItem("user", JSON.stringify(this));

    return this.watchlist;
  }
  removeFromWatchlist(item_to_remove) {
    this.watchlist = this.watchlist.filter((item) => item == item_to_remove);

    // update firebase
    const userRef = doc(firestore_db, "users", this.uid).withConverter(
      userConverter
    );
    updateDoc(userRef, {
      watchlist: this.watchlist,
    }).then(() => {
      console.log("updated watchlist");
    });

    return this.watchlist;
  }
  getItemFromWatchlist(symbol) {
    let temp = this.watchlist.filter((item) => item.symbol == symbol);
    console.log("User, getItemFromWatchlist", temp);
    if (temp?.length > 0) {
      return getFinancialAsset(temp[0].symbol, temp[0].type, temp[0].tracker);
    } else {
      return null;
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
// firebase user object converter
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
