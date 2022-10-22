import React from 'react';
import { USER_ROLE } from '../constant';

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

export type Action<T, K = string> = {
  type: K;
  data: T;
};

export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;
