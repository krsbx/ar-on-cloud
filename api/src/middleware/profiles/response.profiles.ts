import { asyncMw } from 'express-asyncmw';
import _ from 'lodash';
import repository from 'repository';
import { sequentialPromiseResolver } from 'utils/promises';
import { createGetResponse, createGetsResponse } from 'utils/responses';

export const returnProfileMw = asyncMw(async (req, res) => {
  const response = createGetResponse(req, await repository.profile.modelToResource(req.profile));

  return res.status(response.code).json(response);
});

export const returnProfilesMw = asyncMw(async (req, res) => {
  const results = await sequentialPromiseResolver(
    _.map(_.get(req.profiles, 'rows', []), (profile) => repository.profile.modelToResource(profile))
  );

  const response = createGetsResponse(req, {
    rows: results,
    count: _.get(req.profiles, 'count', 0),
  });

  return res.status(response.code).json(response);
});
