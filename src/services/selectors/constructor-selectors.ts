import { RootState } from '../store';

const selectConstructorState = (state: RootState) => state.burgerConstructor;

export const selectConstructorItems = (state: RootState) =>
  selectConstructorState(state).constructorItems;
