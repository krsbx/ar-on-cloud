import _ from 'lodash';
import { hashText } from '../utils/encryption';
import factory, { ModelStructure } from './baseRepository';

const { models, ...userRepostiory } = factory('user');

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

// use for extending the user repository
// by doing this, we can have an intellisense
const extendsUserRepository = {
  getProfile,
};

const repository = {
  ...userRepostiory,
  ...extendsUserRepository,
};

export default repository;
