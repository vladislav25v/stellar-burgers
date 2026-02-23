import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { logoutUser } from './auth-slice';

type TOrdersState = {
  userOrders: TOrder[];
  userOrdersLoading: boolean;
  userOrdersError: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;
};

const initialState: TOrdersState = {
  userOrders: [],
  userOrdersLoading: false,
  userOrdersError: null,
  orderRequest: false,
  orderModalData: null,
  orderError: null
};

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to load user orders'
    );
  }
});

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('orders/createOrder', async (ingredientsIds, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredientsIds);
    return {
      _id: response.order._id,
      status: response.order.status,
      name: response.order.name,
      createdAt: response.order.createdAt,
      updatedAt: response.order.updatedAt,
      number: response.order.number,
      ingredients: ingredientsIds
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to create order'
    );
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.userOrdersLoading = true;
        state.userOrdersError = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.userOrdersLoading = false;
          state.userOrders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersError = action.payload || 'Failed to load user orders';
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderRequest = false;
          state.orderModalData = action.payload;
          state.userOrders = [action.payload, ...state.userOrders];
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload || 'Failed to create order';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userOrders = [];
        state.orderModalData = null;
      });
  }
});

export const { closeOrderModal } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
