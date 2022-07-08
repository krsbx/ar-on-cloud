import _ from 'lodash';
import asyncMw from 'fork-async-express-mw';
import repository from '../repository';

export const createProfileMw = asyncMw(async (req, res, next) => {
  const profile = await repository.profile.findOne({ userId: req.body.userId });

  // If profile already exists, return it
  if (profile) {
    req.profile = profile;
    return next();
  }

  const data = await repository.profile.resourceToModel(req.body);
  req.profile = await repository.profile.create(data);

  return next();
});

export const getProfileMw = asyncMw(async (req, res, next) => {
  const profile = await repository.profile.findOne(req.params.id);

  if (!profile) {
    return res.status(404).json({
      message: 'Profile not found',
    });
  }

  req.profile = profile;

  return next();
});

export const getProfilesMw = asyncMw(async (req, res, next) => {
  req.profiles = await repository.profile.findAll({}, req.filterQueryParams, req.query);

  return next();
});

export const updateProfileMw = asyncMw(async (req, res, next) => {
  const data = await repository.profile.resourceToModel(req.body);
  req.profile = await repository.profile.update(req.params.id, data);

  return next();
});

export const deleteProfileMw = asyncMw(async (req, res) => {
  await repository.profile.delete(req.params.id);

  return res.status(204).json({
    message: 'Profile deleted',
  });
});

export const returnProfileMw = asyncMw(async (req, res) => {
  return res.status(200).json(await repository.profile.modelToResource(req.profile));
});

export const returnProfilesMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.profiles, 'rows', []), (profile) =>
        repository.profile.modelToResource(profile)
      )
    ),
    count: _.get(req.profiles, 'count', 0),
  });
});
