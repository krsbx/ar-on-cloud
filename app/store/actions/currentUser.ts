import { setToken, setUserId } from 'utils/cookieUtils';
import axios from 'store/axios';
import { CURRENT_USER_ACTION } from 'store/reducers/currentUser';
import { getUserById } from './users';

export const userLogin =
  (payload: CloudAR.Payload.User['Login']) => async (dispatch: CloudAR.Store.AppDispatch) => {
    const { data } = await axios.post<CloudAR.Response.User['Login']>('/auth/login', payload);

    setToken(data.token);
    setUserId(data.id);

    const user = await getUserById(data.id)();

    dispatch({
      type: CURRENT_USER_ACTION.SET,
      data: user,
    });

    return user;
  };

export const userRegister = (payload: CloudAR.Payload.User['Register']) => async () => {
  await axios.post('/auth/register', payload);
};
