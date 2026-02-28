import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { selectIngredients, selectIngredientsLoading } from '@selectors';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientData = ingredients.find((item) => item._id === id);

  if (isIngredientsLoading) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return null;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
