import { combineReducers } from '@reduxjs/toolkit';
import {
  authReducer,
  constructorReducer,
  feedReducer,
  ingredientsReducer,
  ordersReducer
} from './slices';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  burgerConstructor: constructorReducer,
  auth: authReducer,
  orders: ordersReducer
});
