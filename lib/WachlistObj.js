import {
  getCompanyOverview,
  getMultipleCompanyOverviews,
  getNewsSentiment,
} from "./yourUtilityFunctionsFile"; // Adjust the import path accordingly

export class Watchlist {
  constructor(tickers = []) {
    this.tickers = tickers;
  }


  // Fetch company overview for a specific ticker
  async fetchCompanyOverview(ticker) {
    return getCompanyOverview(ticker);
  }

  // Fetch company overviews for all tickers in the watchlist
  async fetchAllCompanyOverviews() {
    return getMultipleCompanyOverviews(this.tickers);
  }

  // Fetch news sentiment for a specific set of parameters
  async fetchNewsSentiment(params) {
    return getNewsSentiment(params);
  }
}
