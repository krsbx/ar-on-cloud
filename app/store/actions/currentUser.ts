import { Dispatch } from 'redux';
import {
  CurrentUserAction,
  CurrentUserActionType as ActionType,
} from 'store/actions-types/currentUser';
import axios from 'store/axios';
import { getUserId, setToken, setUserId } from 'utils/cookieUtils';
import { getUserById } from './users';

export const setCurrentUser =
  (user: CloudAR.Resource.User) => (dispatch: Dispatch<CurrentUserAction>) =>
    dispatch({
      type: ActionType.SET,
      payload: user,
    });

export const getCurrentUser = () => async (dispatch: Dispatch<CurrentUserAction>) => {
  const userId = getUserId();

  if (!userId) return {} as CloudAR.Resource.User;

  const user = await getUserById(userId, '')();

  setCurrentUser(user)(dispatch);

  return user;
};

export const userLogin =
  (payload: CloudAR.Payload.User['Login']) => async (dispatch: Dispatch<CurrentUserAction>) => {
    const { data } = await axios.post<CloudAR.Response.User['Login']>('/auth/login', payload);

    setToken(data.token);
    setUserId(data.id);

    const user = await getUserById(data.id)();

    setCurrentUser(user)(dispatch);

    return user;
  };

export const userRegister = (payload: CloudAR.Payload.User['Register']) => async () =>
  axios.post('/auth/register', payload);
