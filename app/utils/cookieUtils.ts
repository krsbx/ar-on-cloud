import jwtDecode, { JwtPayload } from 'jwt-decode';
import Cookies from 'js-cookie';
import { COOKIE_KEY } from './constant';

export const isAuthenticated = () => {
  const token = Cookies.get(COOKIE_KEY.TOKEN);

  if (!token) return false;

  const { exp }: JwtPayload = jwtDecode(token);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return exp! * 1000 < Date.now();
};

export const setToken = (token: string) => {
  Cookies.set(COOKIE_KEY.TOKEN, token);
};

export const getToken = () => Cookies.get(COOKIE_KEY.TOKEN);

export const setUserId = (id: number) => {
  Cookies.set(COOKIE_KEY.USER_ID, id.toString());
};

export const getUserId = () => Cookies.get(COOKIE_KEY.USER_ID);

export const clearCookies = () => {
  Cookies.remove(COOKIE_KEY.TOKEN);
  Cookies.remove(COOKIE_KEY.USER_ID);
};
