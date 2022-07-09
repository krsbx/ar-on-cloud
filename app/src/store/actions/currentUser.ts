import axios from '../axios';
import { setToken, setUserId } from 'src/utils/cookieUtils';
import { AppDispatch } from '..';
import { CURRENT_USER_TYPE } from '../reducers/currentUser';
import {
  UserLoginPayload,
  UserLoginResponse,
  UserRegisterPayload,
} from 'src/utils/interfaces/payloadsReponses';
import { getUserById } from './users';

export const userLogin = (payload: UserLoginPayload) => async (dispatch: AppDispatch) => {
  const { data } = await axios.post<UserLoginResponse>('/auth/login', payload);

  setToken(data.token);
  setUserId(data.id);

  const user = await getUserById(data.id)();

  dispatch({
    type: CURRENT_USER_TYPE.SET,
    data: user,
  });

  return user;
};

export const userRegister = (payload: UserRegisterPayload) => async () => {
  await axios.post('/auth/register', payload);
};
