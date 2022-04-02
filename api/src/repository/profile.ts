import _ from 'lodash';
import factory, { ModelStructure } from './baseRepository';

const { ...profileRepository } = factory('profile');

profileRepository.resourceToModel = async (resource: any) => {
  const profile = _.pick(resource, ['firstName', 'lastName', 'bio', 'userId']);

  return profile;
};

profileRepository.modelToResource = async (profile: ModelStructure['profile']) => {
  return _.omit(profile, ['createdAt', 'updatedAt']);
};

// use for extending the profile repository
// by doing this, we can have an intellisense
const extendsprofileRepository = {};

const repository = {
  ...profileRepository,
  ...extendsprofileRepository,
};

export default repository;
