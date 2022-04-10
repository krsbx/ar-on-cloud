import jwtDecode, { JwtPayload } from 'jwt-decode';

type JWT = Omit<JwtPayload, 'exp'> & {
  id: number;
  exp: number;
  token: string;
};

const TOKEN_STORAGE_KEY = 'access_token';

const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

const removeToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);

const parseToken = () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  return jwtDecode<JWT>(token);
};

const isTokenExpired = () => {
  const token = parseToken();

  if (!token) return true;

  return token.exp < Date.now() / 1000;
};

// Is authenticated, if not expired
export const isAuthenticated = () => {
  const isExpired = isTokenExpired();

  if (isExpired) {
    removeToken();
    return false;
  }

  return true;
};
