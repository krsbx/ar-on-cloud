import { asyncMw } from 'express-asyncmw';
import repository from 'repository';

export const createPostMw = asyncMw(async (req, res, next) => {
  if (!req.isAdmin && req.body.userId !== req.userAuth.id) req.body.userId = req.userAuth.id;
  if (!req.body.userId) req.body.userId = req.userAuth.id;

  const data = await repository.post.resourceToModel(req.body);
  req.post = await repository.post.create(data);
  res.statusCode = 201;

  return next();
});
