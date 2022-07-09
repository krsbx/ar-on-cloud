import { Prisma } from '@prisma/client';
import _ from 'lodash';
import { AnyRecord } from '../utils/interface';
import BaseRepository, { ModelStructure } from './baseRepository';

const commentRepository = new BaseRepository<
  Prisma.CommentWhereInput,
  Prisma.CommentSelect,
  Prisma.CommentInclude,
  Prisma.CommentCreateInput,
  Prisma.CommentUpdateInput,
  Prisma.CommentWhereUniqueInput,
  Prisma.CommentOrderByWithRelationInput
>('comment');

const resourceToModel = async (resource: AnyRecord) => {
  const comment = _.pick(resource, ['content', 'userId', 'postId']);

  return comment;
};

const modelToResource = async (model: ModelStructure['comment']) => {
  return model;
};

const extendCommentRepository = {
  resourceToModel,
  modelToResource,
};

const repository = _.assign(commentRepository, extendCommentRepository);

export default repository;
