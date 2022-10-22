import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { COOKIE_KEY } from '../constant';

const useIsAuthenticated = (): boolean => {
  const [isAuth, setIsAuth] = useState(false);
  const [{ token }] = useCookies([COOKIE_KEY.TOKEN]);

  useEffect(() => {
    setIsAuth(!!token);
  }, [token]);

  return isAuth;
};

export default useIsAuthenticated;
