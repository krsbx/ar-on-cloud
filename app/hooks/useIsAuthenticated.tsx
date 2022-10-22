import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { COOKIE_KEY } from 'utils/constant';

const useIsAuthenticated = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [{ token }] = useCookies([COOKIE_KEY.TOKEN]);

  useEffect(() => {
    setIsAuth(!!token);
  }, [token]);

  return isAuth;
};

export default useIsAuthenticated;
