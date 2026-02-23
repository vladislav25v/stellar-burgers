import { RootState } from '../store';

const selectOrdersState = (state: RootState) => state.orders;

export const selectUserOrders = (state: RootState) =>
  selectOrdersState(state).userOrders;

export const selectUserOrdersLoading = (state: RootState) =>
  selectOrdersState(state).userOrdersLoading;

export const selectOrderRequest = (state: RootState) =>
  selectOrdersState(state).orderRequest;

export const selectOrderModalData = (state: RootState) =>
  selectOrdersState(state).orderModalData;

export const selectOrderError = (state: RootState) =>
  selectOrdersState(state).orderError;
