import asyncMw from 'fork-async-express-mw';
import repository from '../repository';

export const createProfileMw = asyncMw(async (req, res, next) => {
  const profile = await repository.profile.findOne({
    userId: req.user.id,
  });

  if (profile) {
    req.profile = profile;
    return next();
  }

  if (req.body.userId !== req.user.id && !req.isAdmin) req.body.userId = req.user.id;

  const data = await repository.profile.resourceToModel(req.body);
  req.profile = await repository.profile.create(data);

  return next();
});

export const getProfileMw = asyncMw(async (req, res, next) => {
  const profile = await repository.profile.findOne({
    userId: req.user.id,
  });

  if (!profile) return res.status(404).json({ message: 'Profile not found' });

  req.profile = profile;

  return next();
});

export const updateProfileMw = asyncMw(async (req, res, next) => {
  const data = await repository.profile.resourceToModel(req.body);
  req.profile = await repository.profile.update(req.profile.id, data);

  return next();
});

export const deleteProfileMw = asyncMw(async (req, res) => {
  await repository.profile.delete(req.profile.id);

  return res.status(204).json({
    message: 'Profile deleted',
  });
});

export const returnProfileMw = asyncMw(async (req, res) => {
  return res.status(200).json(await repository.profile.modelToResource(req.profile));
});
