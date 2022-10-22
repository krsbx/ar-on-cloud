export type { AppDispatch, AppState } from 'store';

export type Action<T, K = string> = {
  type: K;
  data: T;
};
