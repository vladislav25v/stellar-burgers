import { RootState } from '../store';

const selectIngredientsState = (state: RootState) => state.ingredients;

export const selectIngredients = (state: RootState) =>
  selectIngredientsState(state).ingredients;

export const selectIngredientsLoading = (state: RootState) =>
  selectIngredientsState(state).isLoading;

export const selectIngredientsError = (state: RootState) =>
  selectIngredientsState(state).error;

export const selectBuns = (state: RootState) =>
  selectIngredients(state).filter((ingredient) => ingredient.type === 'bun');

export const selectMains = (state: RootState) =>
  selectIngredients(state).filter((ingredient) => ingredient.type === 'main');

export const selectSauces = (state: RootState) =>
  selectIngredients(state).filter((ingredient) => ingredient.type === 'sauce');
