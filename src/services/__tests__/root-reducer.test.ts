import { rootReducer } from '../root-reducer';

describe('rootReducer', () => {
  it('returns correct initial state for unknown action', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      feed: {
        data: {
          orders: [],
          total: 0,
          totalToday: 0
        },
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        constructorItems: {
          bun: null,
          ingredients: []
        }
      },
      auth: {
        user: null,
        isLoading: false,
        error: null
      },
      orders: {
        userOrders: [],
        userOrdersLoading: false,
        userOrdersError: null,
        orderRequest: false,
        orderModalData: null,
        orderError: null
      }
    });
  });
});
