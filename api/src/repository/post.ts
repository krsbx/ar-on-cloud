import _ from 'lodash';
import factory, { ModelStructure } from './baseRepository';

const { ...postRepository } = factory('post');

postRepository.resourceToModel = async (resource: any) => {
  const post = _.pick(resource, ['title', 'content', 'userId']);

  return post;
};

postRepository.modelToResource = async (model: ModelStructure['post']) => {
  return model;
};

const extendPostRepository = {};

const repository = _.assign(postRepository, extendPostRepository);

export default repository;
