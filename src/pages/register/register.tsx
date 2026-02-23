import { FC, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAuthError } from '@selectors';
import { registerUser } from '@slices';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';

type TLocationState = {
  from?: {
    pathname: string;
  };
};

const MIN_PASSWORD_LENGTH = 6;

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authError = useSelector(selectAuthError);
  const from = (location.state as TLocationState | null)?.from?.pathname || '/';

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (password.trim().length < MIN_PASSWORD_LENGTH) {
      setValidationError(
        `Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов`
      );
      return;
    }

    setValidationError('');

    try {
      await dispatch(
        registerUser({
          name: userName,
          email,
          password
        })
      ).unwrap();
      navigate(from, { replace: true });
    } catch {
      // error is handled in Redux state
    }
  };

  return (
    <RegisterUI
      errorText={validationError || authError || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
