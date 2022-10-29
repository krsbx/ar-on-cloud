import {
  CurrentUserActionType as ActionType,
  DeleteCurrentUser,
  SetCurrentUser,
} from 'store/actions-types/currentUser';

const currentUser = (
  state: CloudAR.Resource.User = <CloudAR.Resource.User>{},
  action: SetCurrentUser | DeleteCurrentUser
) => {
  switch (action.type) {
    case ActionType.SET:
      return {
        ...state,
        ...action.payload,
      };

    case ActionType.DELETE:
      return <CloudAR.Resource.User>{};

    default:
      return state;
  }
};

export default currentUser;
