import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  selectFeedOrders,
  selectIngredients,
  selectUserOrders
} from '@selectors';
import { fetchFeed, fetchUserOrders } from '@slices';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const ingredients = useSelector(selectIngredients);
  const feedOrders = useSelector(selectFeedOrders);
  const userOrders = useSelector(selectUserOrders);
  const orderData =
    userOrders.find((order) => order.number === Number(number)) ||
    feedOrders.find((order) => order.number === Number(number));

  useEffect(() => {
    if (!userOrders.length && localStorage.getItem('refreshToken')) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, userOrders.length]);

  useEffect(() => {
    if (!feedOrders.length) {
      dispatch(fetchFeed());
    }
  }, [dispatch, feedOrders.length]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
