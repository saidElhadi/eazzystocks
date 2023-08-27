// import {useIntradayTimeSeries2} from './useIntradayTimeSeries2';

export const getPerformance = (symbol, tracker) => {
  let startDate = new Date(tracker);
  let endDate = new Date();
  let hours = Math.floor((endDate - startDate) / (1000 * 60 * 60));

  if (hours < 24) {
  }
  if (hours < 24 * 7) {
  }
  if (hours < 24 * 30) {
  }
  if (hours < 24 * 365) {
  }
};
