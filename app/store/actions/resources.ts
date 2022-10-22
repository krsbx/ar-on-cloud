import axios from 'store/axios';

export const setResource = (resourceName: CloudAR.Resource.ResourceKey, data: unknown) => ({
  type: `resources.${resourceName}.set`,
  data,
});

export const updateResource = (resourceName: CloudAR.Resource.ResourceKey, data: unknown) => ({
  type: `resources.${resourceName}.update`,
  data, // { id, data }
});

export const overwriteResource = (resourceName: CloudAR.Resource.ResourceKey, data: unknown) => ({
  type: `resources.${resourceName}.overwrite`,
  data,
});

export const deleteResource = (resourceName: CloudAR.Resource.ResourceKey, data: unknown) => ({
  type: `resources.${resourceName}.delete`,
  data, // id
});

export const getAllData =
  <T extends CloudAR.Resource.ResourceKey>(resourceName: T, query = '', overwrite = true) =>
  async () => {
    const { data } = await axios.get<CloudAR.Resource.ResourceMap[T][]>(
      `/${resourceName}?${query}`,
      {
        headers: {
          resourceName,
          overwrite,
        },
      }
    );

    return data as CloudAR.Resource.ResourceMap[T][];
  };

export const getDataById =
  <T extends CloudAR.Resource.ResourceKey>(
    resourceName: T,
    id: number | string,
    query = '',
    overwrite = false
  ) =>
  async () => {
    const { data } = await axios.get<CloudAR.Resource.ResourceMap[T]>(
      `/${resourceName}/${id}?${query}`,
      {
        headers: {
          resourceName,
          overwrite,
        },
      }
    );

    return data as CloudAR.Resource.ResourceMap[T];
  };

export const addData =
  <T extends CloudAR.Resource.ResourceKey>(resourceName: T, payload: unknown) =>
  async (dispatch: CloudAR.Store.AppDispatch) => {
    const { data } = await axios.post<CloudAR.Resource.ResourceMap[T]>(
      `/${resourceName}`,
      payload,
      {
        headers: {
          resourceName,
        },
      }
    );

    dispatch(
      updateResource(resourceName, {
        id: data.id,
        data,
      })
    );

    return data as CloudAR.Resource.ResourceMap[T];
  };

export const updateData =
  <T extends CloudAR.Resource.ResourceKey>(resourceName: T) =>
  (id: number, update: unknown, query = '') =>
  async () => {
    const { data } = await axios.patch<CloudAR.Resource.ResourceMap[T]>(
      `/${resourceName}/${id}?${query}`,
      update,
      {
        headers: {
          resourceName,
        },
      }
    );

    return data as CloudAR.Resource.ResourceMap[T];
  };

export const deleteData =
  <T extends CloudAR.Resource.ResourceKey>(resourceName: T, id: number) =>
  async (dispatch: CloudAR.Store.AppDispatch) => {
    await axios.delete(`/${resourceName}/${id}`);

    dispatch(deleteResource(resourceName, id));
  };
