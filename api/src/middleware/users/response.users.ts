import { asyncMw } from 'express-asyncmw';
import _ from 'lodash';
import repository from 'repository';
import { sequentialPromiseResolver } from 'utils/promises';
import { createGetResponse, createGetsResponse } from 'utils/responses';

export const returnUserMw = asyncMw(async (req, res) => {
  const response = createGetResponse(req, await repository.user.modelToResource(req.user));

  return res.status(response.code).json(response);
});

export const returnUsersMw = asyncMw(async (req, res) => {
  const results = await sequentialPromiseResolver(
    _.map(_.get(req.users, 'rows', []), (user) => repository.user.modelToResource(user))
  );

  const response = createGetsResponse(req, {
    rows: results,
    count: _.get(req.users, 'count', 0),
  });

  return res.status(response.code).json(response);
});
