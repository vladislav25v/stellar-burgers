import { RootState } from '../store';

const selectAuthState = (state: RootState) => state.auth;

export const selectUser = (state: RootState) => selectAuthState(state).user;
export const selectAuthLoading = (state: RootState) =>
  selectAuthState(state).isLoading;
export const selectAuthError = (state: RootState) =>
  selectAuthState(state).error;
