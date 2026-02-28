import { ReactElement, useEffect } from 'react';
import {
  Location,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} from '@selectors';
import { fetchIngredients, fetchUser } from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import '../../index.css';
import styles from './app.module.css';

type TProtectedRouteProps = {
  component: ReactElement;
  onlyUnAuth?: boolean;
};

const ProtectedRoute = ({
  component,
  onlyUnAuth = false
}: TProtectedRouteProps) => {
  const location = useLocation();
  const isAuth = Boolean(localStorage.getItem('refreshToken'));

  if (onlyUnAuth && isAuth) {
    return <Navigate to='/' replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return component;
};

const AppRouter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientsError = useSelector(selectIngredientsError);
  const background = (location.state as { background?: Location } | null)
    ?.background;

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  const closeModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route
          path='/'
          element={
            isIngredientsLoading ? (
              <Preloader />
            ) : ingredientsError ? (
              <div
                className={`${styles.error} text text_type_main-medium pt-4`}
              >
                {ingredientsError}
              </div>
            ) : ingredients.length > 0 ? (
              <ConstructorPage />
            ) : (
              <div
                className={`${styles.title} text text_type_main-medium pt-4`}
              >
                Нет ингредиентов
              </div>
            )
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={<ProtectedRoute component={<Login />} onlyUnAuth />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute component={<Register />} onlyUnAuth />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute component={<ForgotPassword />} onlyUnAuth />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute component={<ResetPassword />} onlyUnAuth />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute component={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<ProtectedRoute component={<OrderInfo />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Ingredient details' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                component={
                  <Modal title='' onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRouter;
