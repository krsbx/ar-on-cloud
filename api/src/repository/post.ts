import _ from 'lodash';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';
import factory from './baseRepository';

const postRepository = factory(MODELS_NAME.POST);

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
