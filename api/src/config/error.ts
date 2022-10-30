import { Prisma } from '@prisma/client';
import type { ErrorRequestHandler } from 'express';
import _ from 'lodash';

export const errorHandling: ErrorRequestHandler = (err, req, res, next) => {
  if (!err) return next();

  let data = {};

  Object.assign(data, {
    message: err.message,
  });

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    Object.assign(data, {
      code: err.code,
      meta: err.meta,
      stack: err.stack,
    });
  }

  data = _.reduce(
    data,
    (acc, curr, key) => {
      if (_.isNil(curr)) return acc;

      return {
        ...acc,
        [key]: curr,
      };
    },
    {}
  );

  return res.json(data);
};
