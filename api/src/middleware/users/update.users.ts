import { asyncMw } from 'express-asyncmw';
import repository from 'repository';
import { createConflictResponse, createOnlyAdminResponse } from 'utils/responses';

export const updateUserMw = asyncMw(async (req, res, next) => {
  if (req.userAuth.id !== +req.params.id && !req.isAdmin) {
    const response = createOnlyAdminResponse();
    return res.status(response.code).json(response);
  }

  if (!req.isAdmin) delete req.body.role;

  const exist = await repository.user.checkEmailUsername(
    req.body.email,
    req.body.username,
    req.user.id
  );

  if (exist) {
    const response = createConflictResponse(exist);
    return res.status(response.code).json(response);
  }

  const data = await repository.user.resourceToModel(req.body);
  await repository.user.update(req.params.id, data);

  return next();
});
