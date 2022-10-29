import asyncMw from 'express-asyncmw';
import repository from 'repository';
import { createNotFoundResponse } from 'utils/responses';

export const getCommentMw = asyncMw(async (req, res, next) => {
  const comment = await repository.comment.findOne(req.params.id, {
    include: {
      // Get the user who posted the post
      user: true,
    },
  });

  if (!comment) {
    const response = createNotFoundResponse('Comment');
    return res.status(404).json(response);
  }

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
      include: {
        user: true,
      },
    }
  );

  return next();
});
