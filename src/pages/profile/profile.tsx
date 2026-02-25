import { ProfileUI } from '@ui-pages';
import { selectAuthError, selectUser } from '@selectors';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { updateUser } from '@slices';
import { useDispatch, useSelector } from '../../services/store';

const MIN_PASSWORD_LENGTH = 6;

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const updateUserError = useSelector(selectAuthError);
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== (user?.name || '') ||
    formValue.email !== (user?.email || '') ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      formValue.password &&
      formValue.password.trim().length < MIN_PASSWORD_LENGTH
    ) {
      setValidationError(
        `Пароль должен быть не меньше ${MIN_PASSWORD_LENGTH} знаков!`
      );
      setSuccessMessage('');
      return;
    }

    setValidationError('');

    const userData = {
      name: formValue.name,
      email: formValue.email,
      ...(formValue.password ? { password: formValue.password } : {})
    };

    try {
      await dispatch(updateUser(userData)).unwrap();
      setFormValue((prevState) => ({
        ...prevState,
        password: ''
      }));
      setSuccessMessage('Профиль пользователя успешно обновлён');
    } catch {
      setSuccessMessage('');
      // error is handled in Redux state
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setValidationError('');
    setSuccessMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError('');
    setSuccessMessage('');
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={validationError || updateUserError || undefined}
      successMessage={successMessage || undefined}
    />
  );
};
