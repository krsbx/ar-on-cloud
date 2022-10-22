import asyncMw from 'express-asyncmw';
import _ from 'lodash';
import repository from '../repository';

export const createPostMw = asyncMw(async (req, res, next) => {
  if (!req.body.userId) req.body.userId = req.userAuth.id;

  const data = await repository.post.resourceToModel(req.body);
  req.post = await repository.post.create(data);

  return next();
});

export const getPostMw = asyncMw(async (req, res, next) => {
  const post = await repository.post.findOne(req.params.id, {
    ...(!req.user && {
      include: {
        // Get the user who posted the post
        user: true,
      },
    }),
  });

  if (!post) return res.status(404).json({ message: 'Post not found' });

  req.post = post;

  return next();
});

export const getPostsMw = asyncMw(async (req, res, next) => {
  req.posts = await repository.post.findAll(
    {
      ...(req.user && {
        userId: req.user.id,
      }),
    },
    req.filterQueryParams,
    req.query,
    {
      include: !_.isEmpty(req.users)
        ? {
            user: true,
          }
        : {},
    }
  );

  return next();
});

export const updatePostMw = asyncMw(async (req, res, next) => {
  if (req.userAuth.id !== req.post.userId && !req.isAdmin)
    return res.status(403).json({ message: 'Forbidden' });

  const data = await repository.post.resourceToModel(req.body);
  req.post = await repository.post.update(req.params.id, data);

  return next();
});

export const deletePostMw = asyncMw(async (req, res) => {
  if (req.userAuth.id !== req.post.userId && !req.isAdmin)
    return res.status(403).json({ message: 'Forbidden' });

  await repository.post.delete(req.params.id);

  return res.status(204).json({
    message: 'Post deleted',
  });
});

export const returnPostMw = asyncMw(async (req, res) => {
  return res.status(200).json({
    ...(await repository.post.modelToResource(req.post)),
    ...(req.post.user && {
      user: await repository.user.modelToResource(req.post.user),
    }),
  });
});

export const returnPostsMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.posts, 'rows', []), async (post) => ({
        ...(await repository.post.modelToResource(post)),
        ...(post.user && {
          user: await repository.user.modelToResource(post.user),
        }),
      }))
    ),
    count: _.get(req.posts, 'count', 0),
  });
});
