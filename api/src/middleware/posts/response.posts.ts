import asyncMw from 'express-asyncmw';
import _ from 'lodash';
import repository from 'repository';
import { createGetResponse, createGetsResponse } from 'utils/responses';

export const returnPostMw = asyncMw(async (req, res) => {
  const response = createGetResponse(req, {
    ...(await repository.post.modelToResource(req.post)),
    user: req.post.user ? await repository.user.modelToResource(req.post.user) : null,
  });

  return res.status(req.statusCode ?? 200).json(response);
});

export const returnPostsMw = asyncMw(async (req, res) => {
  const response = createGetsResponse(req, {
    rows: await Promise.all(
      _.map(_.get(req.posts, 'rows', []), async (post) => ({
        ...(await repository.post.modelToResource(post)),
        user: post.user ? await repository.user.modelToResource(post.user) : null,
      }))
    ),
    count: _.get(req.posts, 'count', 0),
  });

  return res.status(req.statusCode ?? 200).json(response);
});
