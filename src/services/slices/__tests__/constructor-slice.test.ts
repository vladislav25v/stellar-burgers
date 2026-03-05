import {
  addIngredient,
  constructorReducer,
  moveIngredientUp,
  removeIngredient
} from '../constructor-slice';
import { TIngredient } from '../../../utils/types';

const createIngredient = (
  id: string,
  name: string,
  type: 'bun' | 'main' | 'sauce'
): TIngredient => ({
  _id: id,
  name,
  type,
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: 'image',
  image_large: 'image_large',
  image_mobile: 'image_mobile'
});

describe('burgerConstructor reducer', () => {
  it('replaces bun on repeated add and does not put buns into ingredients', () => {
    const firstBun = createIngredient('bun_1', 'Bun 1', 'bun');
    const secondBun = createIngredient('bun_2', 'Bun 2', 'bun');

    const stateWithFirstBun = constructorReducer(
      undefined,
      addIngredient(firstBun)
    );
    const state = constructorReducer(stateWithFirstBun, addIngredient(secondBun));

    expect(state.constructorItems.bun).toMatchObject({
      _id: secondBun._id,
      name: secondBun.name,
      type: secondBun.type
    });
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('handles addIngredient action', () => {
    const main = createIngredient('main_1', 'Main 1', 'main');

    const state = constructorReducer(undefined, addIngredient(main));

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toMatchObject({
      _id: main._id,
      name: main.name,
      type: main.type
    });
    expect(state.constructorItems.ingredients[0].id).toEqual(
      expect.any(String)
    );
  });

  it('handles removeIngredient action', () => {
    const main = createIngredient('main_1', 'Main 1', 'main');
    const stateWithIngredient = constructorReducer(
      undefined,
      addIngredient(main)
    );
    const ingredientId = stateWithIngredient.constructorItems.ingredients[0].id;

    const state = constructorReducer(
      stateWithIngredient,
      removeIngredient(ingredientId)
    );

    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('handles moving ingredients order in filling list', () => {
    const firstMain = createIngredient('main_1', 'Main 1', 'main');
    const secondMain = createIngredient('main_2', 'Main 2', 'main');

    const stateWithTwoIngredients = constructorReducer(
      constructorReducer(undefined, addIngredient(firstMain)),
      addIngredient(secondMain)
    );

    const state = constructorReducer(
      stateWithTwoIngredients,
      moveIngredientUp(1)
    );

    expect(state.constructorItems.ingredients[0]._id).toBe('main_2');
    expect(state.constructorItems.ingredients[1]._id).toBe('main_1');
  });
});
