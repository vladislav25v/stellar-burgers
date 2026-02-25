export { ingredientsReducer, fetchIngredients } from './ingredients-slice';
export { feedReducer, fetchFeed } from './feed-slice';
export {
  addIngredient,
  constructorReducer,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  resetConstructor
} from './constructor-slice';
export {
  authReducer,
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './auth-slice';
export {
  closeOrderModal,
  createOrder,
  fetchUserOrders,
  ordersReducer
} from './orders-slice';
