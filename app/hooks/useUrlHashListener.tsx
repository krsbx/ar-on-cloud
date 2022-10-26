import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useUrlHashListener = () => {
  const router = useRouter();
  const [hash, setHash] = useState('');

  const updateNextHash = (str: string) => {
    if (!str) return;

    const hash = str.split('#')[1];
    setHash(hash);

    window.location.hash = hash;
  };

  const onWindowHashChange = () => updateNextHash(window.location.hash);
  const onNextJSHashChange = (url: string) => updateNextHash(url);

  useEffect(() => {
    router.events.on('hashChangeStart', onNextJSHashChange);
    window.addEventListener('hashchange', onWindowHashChange);
    window.addEventListener('load', onWindowHashChange);

    return () => {
      router.events.off('hashChangeStart', onNextJSHashChange);
      window.removeEventListener('load', onWindowHashChange);
      window.removeEventListener('hashchange', onWindowHashChange);
    };
  }, [router.asPath, router.events]); // eslint-disable-line react-hooks/exhaustive-deps

  return hash;
};

export default useUrlHashListener;
