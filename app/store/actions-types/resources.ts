import { RESOURCE_NAME } from 'utils/constant/global';

export type ActionType<ResourceName extends CloudAR.Resource.ResourceKey> = {
  SET_RESOURCE: `resources.${ResourceName}.set`;
  UPDATE_RESOURCE: `resources.${ResourceName}.update`;
  OVERWRITE_RESOURCE: `resources.${ResourceName}.overwrite`;
  DELETE_RESOURCE: `resources.${ResourceName}.delete`;
};

const genereateResourceEnum = <ResourceName extends CloudAR.Resource.ResourceKey>(
  resourceName: ResourceName
) => {
  const ResourceActionType = {
    SET_RESOURCE: `resources.${resourceName}.set`,
    UPDATE_RESOURCE: `resources.${resourceName}.update`,
    OVERWRITE_RESOURCE: `resources.${resourceName}.overwrite`,
    DELETE_RESOURCE: `resources.${resourceName}.delete`,
  } as const;

  return ResourceActionType as ActionType<ResourceName>;
};

export const ResourceActionType = {
  [RESOURCE_NAME.COMMENTS]: genereateResourceEnum(RESOURCE_NAME.COMMENTS),
  [RESOURCE_NAME.PROFILES]: genereateResourceEnum(RESOURCE_NAME.PROFILES),
  [RESOURCE_NAME.POSTS]: genereateResourceEnum(RESOURCE_NAME.POSTS),
  [RESOURCE_NAME.USERS]: genereateResourceEnum(RESOURCE_NAME.USERS),
} as const;

export type SetResource<T extends CloudAR.Resource.ResourceKey> = {
  type: typeof ResourceActionType[T]['SET_RESOURCE'];
  payload: {
    data: CloudAR.Resource.ResourceMap[T] | CloudAR.Resource.ResourceMap[T][];
    page: CloudAR.Resource.ResourceInfo;
  };
};

export type UpdateResource<T extends CloudAR.Resource.ResourceKey> = {
  type: typeof ResourceActionType[T]['UPDATE_RESOURCE'];
  payload: {
    id: number;
    data: CloudAR.Resource.ResourceMap[T];
  };
};

export type OverwriteResource<T extends CloudAR.Resource.ResourceKey> = {
  type: typeof ResourceActionType[T]['OVERWRITE_RESOURCE'];
  payload: {
    data: CloudAR.Resource.ResourceMap[T] | CloudAR.Resource.ResourceMap[T][];
    page: CloudAR.Resource.ResourceInfo;
  };
};

export type DeleteResource<T extends CloudAR.Resource.ResourceKey> = {
  type: typeof ResourceActionType[T]['DELETE_RESOURCE'];
  payload: number;
};

export type ResourceAction<T extends CloudAR.Resource.ResourceKey> =
  | SetResource<T>
  | UpdateResource<T>
  | OverwriteResource<T>
  | DeleteResource<T>;
