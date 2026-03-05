import { fetchIngredients, ingredientsReducer } from '../ingredients-slice';
import { TIngredient } from '../../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: 'ing_1',
    name: 'Ingredient 1',
    type: 'main',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 123,
    image: 'image',
    image_large: 'image_large',
    image_mobile: 'image_mobile'
  }
];

describe('ingredients reducer', () => {
  it('sets isLoading=true on request action', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('request-id', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores ingredients and sets isLoading=false on success action', () => {
    const loadingState = ingredientsReducer(
      undefined,
      fetchIngredients.pending('request-id', undefined)
    );

    const state = ingredientsReducer(
      loadingState,
      fetchIngredients.fulfilled(mockIngredients, 'request-id', undefined)
    );

    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('stores error and sets isLoading=false on failed action', () => {
    const loadingState = ingredientsReducer(
      undefined,
      fetchIngredients.pending('request-id', undefined)
    );

    const state = ingredientsReducer(
      loadingState,
      fetchIngredients.rejected(
        new Error('Network error'),
        'request-id',
        undefined,
        'Failed to load ingredients'
      )
    );

    expect(state.error).toBe('Failed to load ingredients');
    expect(state.isLoading).toBe(false);
  });
});
