import _ from 'lodash';
import factory, { ModelStructure } from './baseRepository';

const { ...commentRepository } = factory('comment');

commentRepository.resourceToModel = async (resource: any) => {
  const comment = _.pick(resource, ['content', 'userId', 'postId']);

  return comment;
};

commentRepository.modelToResource = async (model: ModelStructure['comment']) => {
  return model;
};

const extendCommentRepository = {};

const repository = _.assign(commentRepository, extendCommentRepository);

export default repository;
