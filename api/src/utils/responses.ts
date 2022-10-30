import type { Request } from 'express';
import httpStatus from 'http-status';
import _ from 'lodash';

export const generateCodeStatusResponse = (code: number) => ({
  code,
  status: httpStatus[`${code}_NAME`],
});

export const createGetResponse = <T>(req: Request, data: T) => ({
  ...generateCodeStatusResponse(req.statusCode ?? 200),
  data: data as Awaited<T>,
});

export const createGetsResponse = <T extends { count: number; rows: unknown[] }>(
  req: Request,
  data: T
) => {
  const limit = +(req.query.limit === 'all' ? 1 : _.get(req.query, 'limit', 10));
  const page = +_.get(req.query, 'page', 0);
  const offset = page > 0 ? limit * (page - 1) : 0;
  const totalData = +_.get(data, 'count', 0);
  const queriedData = _.get(data, 'rows', []) as T['rows'];
  const dataSize = queriedData.length < limit ? queriedData.length : limit;

  return {
    ...generateCodeStatusResponse(req.statusCode ?? 200),
    data: queriedData,
    page: {
      size: dataSize,
      total: totalData,
      totalPages: totalData / limit,
      current: offset + 1,
    },
  };
};

export const createCreatedResponse = () => ({
  ...generateCodeStatusResponse(201),
  data: {},
});

export const createBadRequestResponse = (message = 'Bad Request') => ({
  ...generateCodeStatusResponse(400),
  message,
});

export const createUnauthorizedResponse = (message = 'Unauthorized') => ({
  ...generateCodeStatusResponse(401),
  message,
});

export const createOnlyAdminResponse = (message = 'Forbidden') => ({
  ...generateCodeStatusResponse(403),
  message,
});

export const createNotFoundResponse = (name: string) => ({
  ...generateCodeStatusResponse(404),
  message: `${name} not found`,
});

export const createConflictResponse = (message: { message: string } | string) => ({
  ...generateCodeStatusResponse(409),
  ...(_.isObject(message) ? { ...message } : { message }),
});
