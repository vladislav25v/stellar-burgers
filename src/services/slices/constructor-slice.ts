import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
        return;
      }

      state.constructorItems.ingredients.push({
        ...ingredient,
        id: nanoid()
      });
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0 || index >= state.constructorItems.ingredients.length) {
        return;
      }

      const items = state.constructorItems.ingredients;
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const items = state.constructorItems.ingredients;

      if (index < 0 || index >= items.length - 1) {
        return;
      }

      [items[index], items[index + 1]] = [items[index + 1], items[index]];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
