import React from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/ban-types
  type ReactFC<Props extends object = {}> = React.FC<
    Props & {
      children?: React.ReactNode;
    }
  >;

  type ReactRef<T> = React.RefObject<T> | React.MutableRefObject<T>;
}
