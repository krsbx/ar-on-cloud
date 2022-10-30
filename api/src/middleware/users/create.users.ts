import { asyncMw } from 'express-asyncmw';
import repository from 'repository';
import { createConflictResponse, createCreatedResponse } from 'utils/responses';

export const createUserMw = asyncMw(async (req, res, next) => {
  const exist = await repository.user.checkEmailUsername(req.body.email, req.body.username);
  if (exist) {
    const response = createConflictResponse(exist);

    return res.status(response.code).json(response);
  }

  if (!req.isAdmin) delete req.body.role;

  const data = await repository.user.resourceToModel(req.body);
  req.user = await repository.user.create({
    ...data,
    profile: {
      create: {},
    },
  });
  res.statusCode = 201;

  if (!req.userAuth) {
    const response = createCreatedResponse();
    return res.status(response.code).json(response);
  }

  return next();
});
