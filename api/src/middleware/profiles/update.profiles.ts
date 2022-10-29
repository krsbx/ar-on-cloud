import asyncMw from 'express-asyncmw';
import repository from 'repository';

export const updateProfileMw = asyncMw(async (req, res, next) => {
  const data = await repository.profile.resourceToModel(req.body);
  await repository.profile.update(req.params.id, data);

  return next();
});
