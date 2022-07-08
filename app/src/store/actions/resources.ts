import axios from '../axios';
import { ResourceKey, ResourceMap } from 'src/utils/interfaces/resource';
import { AppDispatch } from '..';

export const setResource = (resourceName: ResourceKey, data: unknown) => ({
  type: `resources.${resourceName}.set`,
  data,
});

export const updateResource = (resourceName: ResourceKey, data: unknown) => ({
  type: `resources.${resourceName}.update`,
  data, // { id, data }
});

export const overwriteResource = (resourceName: ResourceKey, data: unknown) => ({
  type: `resources.${resourceName}.overwrite`,
  data,
});

export const deleteResource = (resourceName: ResourceKey, data: unknown) => ({
  type: `resources.${resourceName}.delete`,
  data, // id
});

export const getAllData =
  <T extends ResourceKey>(resourceName: T, query = '', overwrite = true) =>
  async () => {
    const { data } = await axios.get<ResourceMap[T][]>(`/${resourceName}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });

    return data;
  };

export const getDataById =
  <T extends ResourceKey>(resourceName: T, id: number, query = '', overwrite = false) =>
  async () => {
    const { data } = await axios.get<ResourceMap[T]>(`/${resourceName}/${id}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });

    return data;
  };

export const addData =
  <T extends ResourceKey>(resourceName: T, payload: unknown) =>
  async (dispatch: AppDispatch) => {
    const { data } = await axios.post<ResourceMap[T]>(`/${resourceName}`, payload, {
      headers: {
        resourceName,
      },
    });

    dispatch(
      updateResource(resourceName, {
        id: data.id,
        data,
      })
    );

    return data;
  };

export const updateData =
  <T extends ResourceKey>(resourceName: T) =>
  (id: number, update: unknown, query = '') =>
  async () => {
    const { data } = await axios.patch<ResourceMap[T]>(`/${resourceName}/${id}?${query}`, update, {
      headers: {
        resourceName,
      },
    });

    return data;
  };

export const deleteData =
  <T extends ResourceKey>(resourceName: T, id: number) =>
  async (dispatch: AppDispatch) => {
    await axios.delete(`/${resourceName}/${id}`);

    dispatch(deleteResource(resourceName, id));
  };
