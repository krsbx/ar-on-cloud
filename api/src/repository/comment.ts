import _ from 'lodash';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import factory from './baseRepository';

const commentRepository = factory(MODELS_NAME.COMMENT);

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
