import _ from 'lodash';
import { Prisma } from '@prisma/client';
import { AnyRecord } from '../utils/interface';
import BaseRepository, { ModelStructure } from './baseRepository';

const postRepository = new BaseRepository<
  Prisma.PostWhereInput,
  Prisma.PostSelect,
  Prisma.PostInclude,
  Prisma.PostCreateInput,
  Prisma.PostUpdateInput,
  Prisma.PostWhereUniqueInput,
  Prisma.PostOrderByWithRelationInput
>('post');

const resourceToModel = async (resource: AnyRecord) => {
  const post = _.pick(resource, ['title', 'content', 'userId']);

  return post;
};

const modelToResource = async (model: ModelStructure['post']) => {
  return model;
};

const extendPostRepository = {
  resourceToModel,
  modelToResource,
};

const repository = _.assign(postRepository, extendPostRepository);

export default repository;
