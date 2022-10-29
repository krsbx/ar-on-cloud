import asyncMw from 'express-asyncmw';
import _ from 'lodash';
import repository from 'repository';
import { createGetResponse, createGetsResponse } from 'utils/responses';

export const returnProfileMw = asyncMw(async (req, res) => {
  const response = createGetResponse(req, await repository.profile.modelToResource(req.profile));

  return res.status(req.statusCode ?? 200).json(response);
});

export const returnProfilesMw = asyncMw(async (req, res) => {
  const response = createGetsResponse(req, {
    rows: await Promise.all(
      _.map(_.get(req.profiles, 'rows', []), (profile) =>
        repository.profile.modelToResource(profile)
      )
    ),
    count: _.get(req.profiles, 'count', 0),
  });

  return res.status(req.statusCode ?? 200).json(response);
});
