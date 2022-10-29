export enum CurrentUserActionType {
  SET = 'current-user.set',
  DELETE = 'current-user.delete',
}

export type SetCurrentUser = {
  type: CurrentUserActionType.SET;
  payload: CloudAR.Resource.User;
};

export type DeleteCurrentUser = {
  type: CurrentUserActionType.DELETE;
};

export type CurrentUserAction = SetCurrentUser | DeleteCurrentUser;
