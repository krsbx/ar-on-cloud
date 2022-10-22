import { Action } from 'utils/interfaces/global';
import { User } from 'utils/interfaces/resource';

export const CURRENT_USER_TYPE = {
  SET: 'current-user.set',
  DELETE: 'current-user.delete',
} as const;

type CurrentUserType = typeof CURRENT_USER_TYPE[keyof typeof CURRENT_USER_TYPE];

const currentUser = (state: User = <User>{}, action: Action<User, CurrentUserType>) => {
  switch (action.type) {
    case CURRENT_USER_TYPE.SET:
      return {
        ...state,
        ...action.data,
      };

    case CURRENT_USER_TYPE.DELETE:
      return <User>{};

    default:
      return state;
  }
};

export default currentUser;
