export const CURRENT_USER_ACTION = {
  SET: 'current-user.set',
  DELETE: 'current-user.delete',
} as const;

type CurrentUserType = typeof CURRENT_USER_ACTION[keyof typeof CURRENT_USER_ACTION];

const currentUser = (
  state: CloudAR.Resource.User = <CloudAR.Resource.User>{},
  action: CloudAR.Store.Action<CloudAR.Resource.User, CurrentUserType>
) => {
  switch (action.type) {
    case CURRENT_USER_ACTION.SET:
      return {
        ...state,
        ...action.data,
      };

    case CURRENT_USER_ACTION.DELETE:
      return <CloudAR.Resource.User>{};

    default:
      return state;
  }
};

export default currentUser;
