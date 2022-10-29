import asyncMw from 'express-asyncmw';
import httpStatus from 'http-status';
import repository from 'repository';
import { createOnlyAdminResponse } from 'utils/responses';

export const updateUserMw = asyncMw(async (req, res, next) => {
  if (req.userAuth.id !== +req.params.id && !req.isAdmin) {
    const response = createOnlyAdminResponse();
    return res.status(403).json(response);
  }

  if (!req.isAdmin) delete req.body.role;

  const exist = await repository.user.checkEmailUsername(
    req.body.email,
    req.body.username,
    req.user.id
  );

  if (exist)
    return res.status(400).json({
      code: 409,
      status: httpStatus['409_NAME'],
      ...exist,
    });

  const data = await repository.user.resourceToModel(req.body);
  await repository.user.update(req.params.id, data);

  return next();
});
