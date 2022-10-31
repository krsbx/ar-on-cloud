import _ from 'lodash';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './prisma-repo';

class Profile extends BaseRepository(MODELS_NAME.PROFILE) {
  public static async resourceToModel(resource: AnyRecord) {
    const profile = _.pick(resource, ['firstName', 'lastName', 'bio', 'userId']);

    return profile;
  }

  public static async modelToResource(profile: ModelStructure['profile']) {
    return _.omit(profile, ['createdAt', 'updatedAt']);
  }
}

export default Profile;
