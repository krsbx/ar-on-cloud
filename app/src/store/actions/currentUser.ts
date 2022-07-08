import axios from '../axios';
import { getDataById } from './resources';
import { setToken, setUserId } from 'src/utils/cookieUtils';
import { RESOURCE_NAME } from 'src/utils/constant';
import { AppDispatch } from '..';
import { CURRENT_USER_TYPE } from '../reducers/currentUser';
import {
  UserLoginPayload,
  UserLoginResponse,
  UserRegisterPayload,
} from 'src/utils/interfaces/payloadsReponses';

export const userLogin = (payload: UserLoginPayload) => async (dispatch: AppDispatch) => {
  const { data } = await axios.post<UserLoginResponse>('/auth/login', payload);

  setToken(data.token);
  setUserId(data.id);

  const user = await getDataById(RESOURCE_NAME.USER, data.id)();

  dispatch({
    type: CURRENT_USER_TYPE.SET,
    data: user,
  });

  return user;
};

export const userRegister = (payload: UserRegisterPayload) => async () => {
  await axios.post('/auth/register', payload);
};
