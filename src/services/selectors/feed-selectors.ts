import { RootState } from '../store';

const selectFeedState = (state: RootState) => state.feed;

export const selectFeedData = (state: RootState) => selectFeedState(state).data;
export const selectFeedOrders = (state: RootState) =>
  selectFeedData(state).orders;
export const selectFeedLoading = (state: RootState) =>
  selectFeedState(state).isLoading;
export const selectFeedError = (state: RootState) =>
  selectFeedState(state).error;
