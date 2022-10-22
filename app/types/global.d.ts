import React from 'react';

declare global {
  type ReactFC<Props extends object = object> = React.FC<
    Props & {
      children?: React.ReactNode;
    }
  >;

  type ReactRef<T> = React.RefObject<T> | React.MutableRefObject<T>;

  type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;
}
