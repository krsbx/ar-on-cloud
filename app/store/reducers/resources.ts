import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  DeleteResource,
  OverwriteResource,
  ResourceAction,
  ResourceActionType,
  SetResource,
  UpdateResource,
} from 'store/actions-types/resources';
import { RESOURCE_NAME } from 'utils/constant/global';

type ResourceKey = CloudAR.Resource.ResourceKey;
type ResourceStructure<T extends ResourceKey> = CloudAR.Resource.ResourceStructure<T>;

const createDefaultState = () => ({
  data: new Map(),
  page: {
    size: 0,
    total: 0,
    totalPages: 0,
    current: 0,
  },
});

const toArray = <T>(value: T) => (_.isArray(value) ? value : [value]) as T;

const reducer =
  <T extends ResourceKey>(resourceName: T) =>
  (state: ResourceStructure<T> = createDefaultState(), action: ResourceAction<T>) => {
    switch (action.type) {
      case ResourceActionType[resourceName].SET_RESOURCE:
        action = action as SetResource<T>;

        toArray(action.payload.data).forEach((value) => {
          state.data.set(value.id, value);
        });

        return state;

      case ResourceActionType[resourceName].UPDATE_RESOURCE:
        action = action as UpdateResource<T>;

        state.data.set(action.payload.id, action.payload.data);

        return state;

      case ResourceActionType[resourceName].DELETE_RESOURCE:
        action = action as DeleteResource<T>;

        state.data.delete(action.payload);

        return state;

      case ResourceActionType[resourceName].OVERWRITE_RESOURCE:
        action = action as OverwriteResource<T>;

        state.data.clear();

        toArray(action.payload.data).forEach((value) => {
          state.data.set(value.id, value);
        });

        state.page = action.payload.page;

        return state;

      default:
        return state;
    }
  };

const allReducer = _.reduce(
  RESOURCE_NAME,
  (prev, curr) => ({
    ...prev,
    [curr]: reducer(curr),
  }),
  {} as Record<ResourceKey, ReturnType<typeof reducer>>
);

export default combineReducers(allReducer);
