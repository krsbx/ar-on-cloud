import asyncMw from 'express-asyncmw';
import repository from 'repository';

export const createProfileMw = asyncMw(async (req, res, next) => {
  const profile = await repository.profile.findOne({ userId: req.body.userId });

  // If profile already exists, return it
  if (profile) {
    req.profile = profile;
    return next();
  }

  const data = await repository.profile.resourceToModel(req.body);
  req.profile = await repository.profile.create(data);
  res.statusCode = 201;

  return next();
});
