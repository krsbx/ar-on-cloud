import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

class Comment extends BaseRepository(MODELS_NAME.COMMENT) {
  public static async resourceToModel(resource: AnyRecord) {
    const comment = _.pick(resource, ['content', 'userId', 'postId']);

    return comment;
  }

  public static async modelToResource(model: ModelStructure['comment']) {
    return model;
  }
}

export default Comment;
