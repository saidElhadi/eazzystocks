import useSWR from "swr";
import { firestore_db } from "@/firebase/config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
const BASE_URL = "https://www.alphavantage.co/query";
const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VENTAGE_APIKEY;
export const CURRENCIES = {
  DZD: "DZD",
  HKD: "HKD",
  USD: "USD",
  EUR: "EUR",
  AUD: "AUD",
  JPY: "JPY",
};

export const ASSET_TYPES = {
  STOCK: "Stock",
  BOND: "Bond",
  COMMODITY: "Commodity",
  CURRENCY: "Currency",
  CRYPTO: "Crypto",
};
export const getFinancialAsset = (symbol, type, tracker, data) => {
  let asset = null;
  switch (type) {
    case ASSET_TYPES.STOCK:
      asset = new Stock(symbol, tracker, data);
      break;
    case ASSET_TYPES.BOND:
      asset = new Bond(symbol, tracker, data);
      break;
    case ASSET_TYPES.COMMODITY:
      asset = new Commodity(symbol, tracker, data);
      break;
    case ASSET_TYPES.CURRENCY:
      asset = new Currency(symbol, tracker, data);
      break;
    case ASSET_TYPES.CRYPTO:
      asset = new Crypto(symbol, tracker, data);
      break;
    default:
      asset = new FinancialAsset(symbol, type, tracker, data);
      break;
  }
  return asset;
};

export class FinancialAsset {
  // symbol: string--> firebase doc id of the asset
  constructor(symbol, type, tracker, name, data) {
    this.symbol = String(symbol).toUpperCase();
    this.type = type;
    this.tracker = tracker;
    this.name = name;
    this.data = data;
  }

  getName() {
    return this.name;
  }
  getSymbol() {
    return this.symbol;
  }
  getType() {
    return this.type;
  }
  getTracker() {
    return this.tracker;
  }
  toWatchlist() {
    console.log(
      "FinancialAsset, toWachlist",
      this.symbol,
      this.type,
      this.tracker
    );
    return {
      symbol: this.symbol,
      type: this.type,
      tracker: this.tracker ? this.tracker : null,
    };
  }
  static toWatchlist(symbol, type, tracker) {
    return { symbol: symbol, type: type, tracker: tracker };
  }
  static fromWatchlist(symbol, type, tracker) {
    return getFinancialAsset(symbol, type, tracker);
  }

  // Alpha Vantage API querry:
  async getNameDescFromSymbolType() {}
  async getLatestPrice() {}
  async getIntervalPrices(interval) {}
  async getLatestRelatedNews() {}
  getPerformance() {} // if tracker on return performance
  async getCompanyOverview() {}
  async getSymbolDocFromFirebase() {
    try {
      const docRef = doc(
        firestore_db,
        "financial_instruments_records",
        this.symbol
      );
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        console.log(
          "FianlAssetObj, getDocFromSymbol(), data from firebase:",
          docSnapshot.data()
        );
      } else {
        // doc.data() will be undefined in this case
        console.log("FianlAssetObj, getDocFromSymbol(), No such document!");
      }
      return docSnapshot.exists() ? docSnapshot.data() : null;
    } catch (error) {
      console.log(error);
    }
  }
  async setSymbolDocToFirebase(
    data = { symbol: this.symbol, type: this.type }
  ) {
    try {
      const docRef = doc(
        firestore_db,
        "financial_instruments_records",
        this.symbol
      );
      await setDoc(docRef, data).then(() => {
        console.log(`Added ${this.tymbol} doc to firebase db`);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

class Stock extends FinancialAsset {
  constructor(symbol, tracker) {
    super(symbol, ASSET_TYPES.STOCK, tracker);
  }
  getName() {
    return this.type + " " + this.symbol;
  }
}

class Bond extends FinancialAsset {
  constructor(symbol, tracker) {
    super(symbol, ASSET_TYPES.BOND, tracker);
  }
}

class Commodity extends FinancialAsset {
  constructor(symbol, tracker = "none") {
    super(symbol, ASSET_TYPES.COMMODITY, tracker);
  }
}

class Currency extends FinancialAsset {
  constructor(symbol, tracker = "none") {
    super(symbol, ASSET_TYPES.CURRENCY, tracker);
  }
}

class Crypto extends FinancialAsset {
  constructor(symbol, tracker = "none") {
    super(symbol, ASSET_TYPES.CRYPTO, tracker);
  }
}

// Return a FinancialAsset object from a symbol and type and set tracker if passed in
