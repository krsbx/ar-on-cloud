import { asyncMw } from 'express-asyncmw';
import repository from 'repository';
import { createOnlyAdminResponse } from 'utils/responses';

export const updateProfileMw = asyncMw(async (req, res, next) => {
  if (req.userAuth.id !== req.profile.userId && !req.isAdmin) {
    const response = createOnlyAdminResponse();
    return res.status(response.code).json(response);
  }

  const data = await repository.profile.resourceToModel(req.body);
  await repository.profile.update(req.params.id, data);

  return next();
});
