import _ from 'lodash';
import { Prisma } from '@prisma/client';
import { AnyRecord } from '../utils/interface';
import factory, { ModelStructure } from './baseRepository';

const profileRepository = factory<
  Prisma.ProfileWhereInput,
  Prisma.ProfileSelect,
  Prisma.ProfileInclude,
  Prisma.ProfileCreateInput,
  Prisma.ProfileUpdateInput,
  Prisma.ProfileWhereUniqueInput,
  Prisma.ProfileOrderByWithRelationInput
>('profile');

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
