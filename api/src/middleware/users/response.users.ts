import asyncMw from 'express-asyncmw';
import _ from 'lodash';
import repository from 'repository';
import { createGetResponse, createGetsResponse } from 'utils/responses';

export const returnUserMw = asyncMw(async (req, res) => {
  const response = createGetResponse(req, await repository.user.modelToResource(req.user));

  return res.status(req.statusCode ?? 200).json(response);
});

export const returnUsersMw = asyncMw(async (req, res) => {
  const response = createGetsResponse(req, {
    rows: await Promise.all(
      _.map(_.get(req.users, 'rows', []), (user) => repository.user.modelToResource(user))
    ),
    count: _.get(req.users, 'count', 0),
  });

  return res.status(req.statusCode ?? 200).json(response);
});
