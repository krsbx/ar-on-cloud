import _ from 'lodash';
import asyncMw from 'express-asyncmw';
import repository from '../repository';

export const createCommentMw = asyncMw(async (req, res, next) => {
  // If post id is not provided and there is no post, return 400
  if (!req.body.postId) {
    if (req.post) req.body.postId = req.post.id;
    else return res.status(400).json({ message: 'PostId is required' });
  }

  if (!req.body.userId) req.body.userId = req.userAuth.id;

  const data = await repository.comment.resourceToModel(req.body);
  req.comment = await repository.comment.create(data);

  return next();
});

export const getCommentMw = asyncMw(async (req, res, next) => {
  const comment = await repository.comment.findOne(req.params.id, {
    include: {
      // Get the user who posted the post
      user: true,
    },
  });

  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  req.comment = comment;

  return next();
});

export const getCommentsMw = asyncMw(async (req, res, next) => {
  req.comments = await repository.comment.findAll(
    {
      ...(req.post && {
        postId: req.post.id,
      }),
    },
    req.filterQueryParams,
    req.query,
    {
      user: true,
    }
  );

  return next();
});

export const updateCommentMw = asyncMw(async (req, res, next) => {
  if (req.userAuth.id !== req.comment.userId && !req.isAdmin)
    return res.status(403).json({ message: 'Forbidden' });

  // If not an admin, then dont allow to update the postId
  if (req.post && !req.isAdmin) delete req.body.postId;

  const data = await repository.comment.resourceToModel(req.body);
  req.comment = await repository.comment.update(req.params.id, data);

  return next();
});

export const deleteCommentMw = asyncMw(async (req, res) => {
  if (req.userAuth.id !== req.comment.userId && !req.isAdmin)
    return res.status(403).json({ message: 'Forbidden' });

  await repository.comment.delete(req.params.id);

  return res.status(204).json({
    message: 'Comment deleted',
  });
});

export const returnCommentMw = asyncMw(async (req, res) => {
  return res.status(200).json({
    ...(await repository.comment.modelToResource(req.comment)),
    ...(req.comment.user && {
      user: await repository.user.modelToResource(req.comment.user),
    }),
  });
});

export const returnCommentsMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.comments, 'rows', []), async (comment) => ({
        ...(await repository.comment.modelToResource(comment)),
        ...(comment.post && {
          post: await repository.post.modelToResource(comment.post),
        }),
        ...(comment.user && {
          user: await repository.user.modelToResource(comment.user),
        }),
      }))
    ),
    count: _.get(req.comments, 'count', 0),
  });
});
