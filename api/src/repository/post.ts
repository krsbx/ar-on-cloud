import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './prisma-repo';

class Post extends BaseRepository(MODELS_NAME.POST) {
  public static async resourceToModel(resource: AnyRecord) {
    const post = _.pick(resource, ['title', 'content', 'userId']);

    return post;
  }

  public static async modelToResource(model: ModelStructure['post']) {
    return model;
  }
}

export default Post;
