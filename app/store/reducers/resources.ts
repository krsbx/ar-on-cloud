import _ from 'lodash';
import { combineReducers } from 'redux';
import { hasOwnProperty } from 'utils/common';
import { RESOURCE_NAME } from 'utils/constant';

const defaultState = {
  rows: {} as CloudAR.Resource.ResourceStructure<CloudAR.Resource.ResourceKey>,
  count: 0 as number,
};

type Payload<K> = {
  id: number;
  data: K;
};

type Payloads<T extends CloudAR.Resource.ResourceKey> = CloudAR.Resource.ResourceStructure<T>;

type ActionPayload<
  T extends CloudAR.Resource.ResourceKey,
  K extends CloudAR.Resource.ResourceMap[T]
> = Payload<K> | Payloads<T> | number;

const reducer =
  <T extends CloudAR.Resource.ResourceKey, K extends CloudAR.Resource.ResourceMap[T]>(
    resourceName: T
  ) =>
  (state: Payloads<T> = defaultState, action: CloudAR.Store.Action<ActionPayload<T, K>>) => {
    let temp: Payloads<T> = defaultState;

    switch (action.type) {
      case `resources.${resourceName}.set`:
        if (!hasOwnProperty(action.data, 'rows') || _.isNumber(action.data)) return state;

        const data = _.isArray(action.data.rows) ? action.data.rows : [action.data.rows];

        return {
          ...state,
          rows: {
            ...state.rows,
            ..._.keyBy(data, 'id'),
          },
        };

      case `resources.${resourceName}.update`:
        if (hasOwnProperty(action.data, 'rows') || _.isNumber(action.data)) return state;

        return {
          ...state,
          rows: {
            ...state.rows,
            [action.data.id]: {
              ...state.rows[action.data.id],
              ...action.data.data,
            },
          },
        };

      case `resources.${resourceName}.delete`:
        if (!_.isNumber(action.data)) return state;

        temp = _.cloneDeep(state);

        delete temp.rows[action.data];
        return temp;

      case `resources.${resourceName}.overwrite`:
        if (!hasOwnProperty(action.data, 'rows') || _.isNumber(action.data)) return state;

        const data1 = _.isArray(action.data.rows) ? action.data.rows : [action.data.rows];
        let count = state.count;

        if (hasOwnProperty(action.data, 'count') && _.isNumber(action.data.count))
          count = +action.data.count;

        return {
          rows: _.keyBy(data1, 'id'),
          count,
        };

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
  {} as Record<CloudAR.Resource.ResourceKey, ReturnType<typeof reducer>>
);

export default combineReducers<CloudAR.Resource.Resources>(allReducer);
