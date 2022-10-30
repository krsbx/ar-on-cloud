import { asyncMw } from 'express-asyncmw';
import _ from 'lodash';
import repository from 'repository';
import { sequentialPromiseResolver } from 'utils/promises';
import { createGetResponse, createGetsResponse } from 'utils/responses';

export const returnPostMw = asyncMw(async (req, res) => {
  const response = createGetResponse(req, {
    ...(await repository.post.modelToResource(req.post)),
    user: req.post.user ? await repository.user.modelToResource(req.post.user) : null,
  });

  return res.status(response.code).json(response);
});

export const returnPostsMw = asyncMw(async (req, res) => {
  const results = await sequentialPromiseResolver(
    _.map(_.get(req.posts, 'rows', []), async (post) => ({
      ...(await repository.post.modelToResource(post)),
      user: post.user ? await repository.user.modelToResource(post.user) : null,
    }))
  );

  const response = createGetsResponse(req, {
    rows: results,
    count: _.get(req.posts, 'count', 0),
  });

  return res.status(response.code).json(response);
});
