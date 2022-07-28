import _ from 'lodash';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import factory from './baseRepository';

const profileRepository = factory(MODELS_NAME.PROFILE);

const resourceToModel = async (resource: AnyRecord) => {
  const profile = _.pick(resource, ['firstName', 'lastName', 'bio', 'userId']);

  return profile;
};

const modelToResource = async (profile: ModelStructure['profile']) => {
  return _.omit(profile, ['createdAt', 'updatedAt']);
};

const extendsprofileRepository = {
  resourceToModel,
  modelToResource,
};

const repository = _.merge(profileRepository, extendsprofileRepository);

export default repository;
