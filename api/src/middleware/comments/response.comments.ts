import asyncMw from 'express-asyncmw';
import _ from 'lodash';
import repository from 'repository';
import { createGetResponse, createGetsResponse } from 'utils/responses';

export const returnCommentMw = asyncMw(async (req, res) => {
  const response = createGetResponse(req, {
    ...(await repository.comment.modelToResource(req.comment)),
    ...(req.comment.user && {
      user: await repository.user.modelToResource(req.comment.user),
    }),
  });

  return res.status(req.statusCode ?? 200).json(response);
});

export const returnCommentsMw = asyncMw(async (req, res) => {
  const response = createGetsResponse(req, {
    rows: await Promise.all(
      _.map(_.get(req.comments, 'rows', []), async (comment) => ({
        ...(await repository.comment.modelToResource(comment)),
        post: comment.post ? await repository.post.modelToResource(comment.post) : null,
        user: comment.user ? await repository.user.modelToResource(comment.user) : null,
      }))
    ),
    count: _.get(req.comments, 'count', 0),
  });

  return res.status(req.statusCode ?? 200).json(response);
});
