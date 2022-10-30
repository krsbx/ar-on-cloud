import { asyncMw } from 'express-asyncmw';
import _ from 'lodash';
import repository from 'repository';
import { createNotFoundResponse } from 'utils/responses';

export const getUserMw = asyncMw(async (req, res, next) => {
  // Get the user from the database base on the id or the username
  const isUsingId = !_.isNaN(+_.get(req, 'params.id'));

  const user = isUsingId
    ? await repository.user.getProfile(req.params.id)
    : await repository.user.getProfile({
        username: req.params.id,
      });

  if (!user) {
    const response = createNotFoundResponse('User');
    return res.status(response.code).json(response);
  }

  req.user = user;

  return next();
});

export const getUsersMw = asyncMw(async (req, res, next) => {
  req.users = await repository.user.findAll({}, req.filterQueryParams, req.query);

  return next();
});
