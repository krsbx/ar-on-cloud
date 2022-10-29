import asyncMw from 'express-asyncmw';
import httpStatus from 'http-status';
import repository from 'repository';

export const createUserMw = asyncMw(async (req, res, next) => {
  const exist = await repository.user.checkEmailUsername(req.body.email, req.body.username);
  if (exist) {
    return res.status(409).json({
      code: 409,
      status: httpStatus['409_NAME'],
      ...exist,
    });
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
    return res.status(201).json({
      code: 201,
      status: httpStatus['201_NAME'],
      data: {},
    });
  }

  return next();
});
