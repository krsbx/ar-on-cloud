import type { Request } from 'express';
import httpStatus from 'http-status';
import _ from 'lodash';

export const createGetResponse = (req: Request, data: unknown) => ({
  code: req.statusCode ?? 200,
  status: httpStatus[`${req.statusCode ?? 200}_NAME`],
  data,
});

export const createGetsResponse = (req: Request, data: unknown) => {
  const limit = +(req.query.limit === 'all' ? 1 : _.get(req.query, 'limit', 10));
  const page = +_.get(req.query, 'page', 0);
  const offset = page > 0 ? limit * (page - 1) : 0;
  const totalData = +_.get(data, 'count', 0);
  const queriedData = _.get(data, 'rows', []);
  const dataSize = queriedData.length < limit ? queriedData.length : limit;

  return {
    code: 200,
    status: httpStatus['200_NAME'],
    data: queriedData,
    page: {
      size: dataSize,
      total: totalData,
      totalPages: totalData / limit,
      current: offset + 1,
    },
  };
};

export const createNotFoundResponse = (name: string) => ({
  code: 404,
  status: httpStatus['404_NAME'],
  message: `${name} not found`,
});

export const createOnlyAdminResponse = (message?: string) => ({
  code: 403,
  status: httpStatus['403_NAME'],
  message: message ?? 'Forbidden',
});
