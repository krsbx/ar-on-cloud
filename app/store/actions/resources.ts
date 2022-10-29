import { Dispatch } from 'redux';
import {
  DeleteResource,
  OverwriteResource,
  ResourceAction as Action,
  ResourceActionType,
  SetResource,
  UpdateResource,
} from 'store/actions-types/resources';
import axios from 'store/axios';

type ResourceKey = CloudAR.Resource.ResourceKey;
type Response<T extends ResourceKey> = {
  Resource: CloudAR.Response.Resource<T>;
  Resources: CloudAR.Response.Resources<T>;
};
type ResourceMap<T extends ResourceKey> = CloudAR.Resource.ResourceMap[T];

export const setResource = <T extends ResourceKey>(resourceName: T, payload: unknown) =>
  ({
    type: ResourceActionType[resourceName].SET_RESOURCE,
    payload,
  } as SetResource<T>);

export const updateResource = <T extends ResourceKey>(resourceName: T, payload: unknown) =>
  ({
    type: ResourceActionType[resourceName].UPDATE_RESOURCE,
    payload, // { id, data }
  } as UpdateResource<T>);

export const overwriteResource = <T extends ResourceKey>(resourceName: T, payload: unknown) =>
  ({
    type: ResourceActionType[resourceName].OVERWRITE_RESOURCE,
    payload,
  } as OverwriteResource<T>);

export const deleteResource = <T extends ResourceKey>(resourceName: T, payload: unknown) =>
  ({
    type: ResourceActionType[resourceName].DELETE_RESOURCE,
    payload, // id
  } as DeleteResource<T>);

export const getAllData =
  <T extends ResourceKey>(resourceName: T, query = '', overwrite = true) =>
  async () => {
    const { data } = await axios.get<Response<T>['Resources']>(`/${resourceName}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });

    return data.data as ResourceMap<T>[];
  };

export const getDataById =
  <T extends ResourceKey>(resourceName: T, id: number | string, query = '', overwrite = false) =>
  async () => {
    const { data } = await axios.get<Response<T>['Resource']>(`/${resourceName}/${id}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });

    return data.data as ResourceMap<T>;
  };

export const addData =
  <T extends ResourceKey>(resourceName: T, payload: unknown) =>
  async (dispatch: Dispatch<Action<T>>) => {
    const { data } = await axios.post<Response<T>['Resource']>(`/${resourceName}`, payload, {
      headers: {
        resourceName,
      },
    });

    dispatch(
      updateResource(resourceName, {
        id: data.data.id,
        data: data.data,
      })
    );

    return data.data as ResourceMap<T>;
  };

export const updateData =
  <T extends ResourceKey>(resourceName: T) =>
  (id: number, update: unknown, query = '') =>
  async () => {
    const { data } = await axios.patch<Response<T>['Resource']>(
      `/${resourceName}/${id}?${query}`,
      update,
      {
        headers: {
          resourceName,
        },
      }
    );

    return data.data as ResourceMap<T>;
  };

export const deleteData =
  <T extends ResourceKey>(resourceName: T, id: number) =>
  async (dispatch: Dispatch<Action<T>>) => {
    await axios.delete(`/${resourceName}/${id}`);

    dispatch(deleteResource(resourceName, id));
  };
