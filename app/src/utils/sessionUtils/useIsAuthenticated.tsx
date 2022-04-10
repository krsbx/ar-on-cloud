import { useEffect, useState } from 'react';
import { isAuthenticated } from './sessionUtils';

const useIsAuthenticated = (): boolean => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  return isAuth;
};

export default useIsAuthenticated;
