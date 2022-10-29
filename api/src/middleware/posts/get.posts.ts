import asyncMw from 'express-asyncmw';
import _ from 'lodash';
import repository from 'repository';
import { createNotFoundResponse } from 'utils/responses';

export const getPostMw = asyncMw(async (req, res, next) => {
  const post = await repository.post.findOne(req.params.id, {
    ...(!req.user && {
      include: {
        // Get the user who posted the post
        user: true,
      },
    }),
  });

  if (!post) {
    const response = createNotFoundResponse('Post');
    return res.status(404).json(response);
  }

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
