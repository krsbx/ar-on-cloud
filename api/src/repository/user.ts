import _ from 'lodash';
import { hashText } from '../utils/encryption';
import factory, { ModelStructure } from './baseRepository';

const { ...userRepostiory } = factory('user');

userRepostiory.resourceToModel = async (resource: any) => {
  const user = _.pick(resource, ['email', 'username', 'password']);

  if (resource.password) user.password = await hashText(resource.password);

  return user;
};

userRepostiory.modelToResource = async (user: ModelStructure['user']) => {
  return _.omit(user, ['password', 'updatedAt']);
};

const getProfile = async (id: number | string) => {
  const user = await userRepostiory.findOne(id, {
    include: {
      profile: true,
    },
  });

  return user;
};

const checkEmailUsername = async (
  email: string,
  username: string,
  id: string | number | null = null
) => {
  const checkEmail = await userRepostiory.findOne({
    email,
  });

  if (checkEmail && (id ? checkEmail.id !== id : true))
    return {
      message: 'Email already in use',
    };

  const checkUsername = await userRepostiory.findOne({
    username,
  });

  if (checkUsername && (id ? checkUsername.id !== id : true))
    return {
      message: 'Username already in use',
    };

  return null;
};

// use for extending the user repository
// by doing this, we can have an intellisense
const extendsUserRepository = {
  getProfile,
  checkEmailUsername,
};

const repository = _.merge(userRepostiory, extendsUserRepository);

export default repository;
