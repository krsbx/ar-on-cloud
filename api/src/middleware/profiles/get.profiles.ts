import asyncMw from 'express-asyncmw';
import repository from 'repository';
import { createNotFoundResponse } from 'utils/responses';

export const getProfileMw = asyncMw(async (req, res, next) => {
  const profile = await repository.profile.findOne(req.params.id);

  if (!profile) {
    const response = createNotFoundResponse('Profile');
    return res.status(404).json(response);
  }

  req.profile = profile;

  return next();
});

export const getProfilesMw = asyncMw(async (req, res, next) => {
  req.profiles = await repository.profile.findAll({}, req.filterQueryParams, req.query);

  return next();
});
