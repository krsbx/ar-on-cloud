import { RESOURCE_NAME } from 'utils/constant/global';
import { getAllData, getDataById } from './resources';

export const getAllUser =
  (query = '', overwrite = true) =>
  async () => {
    const users = await getAllData(RESOURCE_NAME.USERS, query, overwrite)();

    return users;
  };

export const getUserById =
  (id: number | string, query = '', overwrite = false) =>
  async () => {
    const user = await getDataById(RESOURCE_NAME.USERS, id, query, overwrite)();

    return user;
  };
