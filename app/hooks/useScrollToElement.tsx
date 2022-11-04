import { useRouter } from 'next/router';
import { useCallback } from 'react';

const useScrollToElement = (params?: ScrollIntoViewOptions, timeout = 500) => {
  const router = useRouter();

  const observeElement = useCallback(
    (value: HTMLElement, callback: (isInView: boolean) => void) => {
      const observer = new IntersectionObserver(([entry]) => {
        const { isIntersecting } = entry;

        if (!isIntersecting) return;

        callback(isIntersecting);

        observer.disconnect();
      });

      observer.observe(value);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const scrollToElement = useCallback((value: string | ReactRef<HTMLElement>) => {
    if (typeof value === 'string') {
      const element = document.getElementById(value);

      if (!element) return;

      element.scrollIntoView({
        behavior: 'smooth',
        ...params,
      });

      observeElement(element, (isInview) => {
        if (!isInview) return;

        setTimeout(() => {
          const currentPath = router.pathname.split('#').shift();
          router.push(`${currentPath}#${value}`);
        }, timeout);
      });

      return;
    }

    if (!value.current || !value.current.scrollIntoView) return;

    value.current.scrollIntoView({
      behavior: 'smooth',
      ...params,
    });

    const id = value.current.id;

    if (!id) return;

    observeElement(value.current, (isInview) => {
      if (!isInview) return;

      setTimeout(() => {
        const currentPath = router.pathname.split('#').shift();
        router.push(`${currentPath}#${id}`);
      }, timeout);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return scrollToElement;
};

export default useScrollToElement;
