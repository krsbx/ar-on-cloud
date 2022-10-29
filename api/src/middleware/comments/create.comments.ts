import asyncMw from 'express-asyncmw';
import httpStatus from 'http-status';
import repository from 'repository';

export const createCommentMw = asyncMw(async (req, res, next) => {
  // If post id is not provided and there is no post, return 400
  if (!req.body.postId) {
    if (req.post) req.body.postId = req.post.id;
    else
      return res.status(400).json({
        code: 400,
        status: httpStatus['400_NAME'],
        message: 'PostId is required',
      });
  }

  if (!req.isAdmin && req.body.userId !== req.userAuth.id) req.body.userId = req.userAuth.id;
  if (!req.body.userId) req.body.userId = req.userAuth.id;

  const data = await repository.comment.resourceToModel(req.body);
  req.comment = await repository.comment.create(data);
  res.statusCode = 201;

  return next();
});
