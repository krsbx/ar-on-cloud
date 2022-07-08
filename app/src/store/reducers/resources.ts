import _ from 'lodash';
import { combineReducers } from 'redux';
import { RESOURCE_NAME } from 'src/utils/constant';
import {
  ResourceStructure,
  ResourceMap,
  Resources,
  ResourceKey,
} from 'src/utils/interfaces/resource';
import { hasOwnProperty } from 'src/utils/common';

const defaultState = {
  rows: {},
  count: 0,
};

type Payload<K> = {
  id: number;
  data: K;
};

type Payloads<T extends ResourceKey> = ResourceStructure<T>;

type Action<T extends ResourceKey, K extends ResourceMap[T]> = {
  type: string;
  data: Payload<K> | Payloads<T> | number;
};

const reducer =
  <T extends ResourceKey, K extends ResourceMap[T]>(resourceName: T) =>
  (state: ResourceStructure<T> = defaultState, action: Action<T, K>) => {
    let temp: ResourceStructure<T> = defaultState;

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

        return {
          rows: _.keyBy(data1, 'id'),
          count: action.data.count,
        };

      default:
        return state;
    }
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allReducer: Record<ResourceKey, any> = {} as any;

_.forEach(RESOURCE_NAME, (resName: ResourceKey) => {
  allReducer[resName] = reducer(resName);
});

export default combineReducers<Resources>(allReducer);
