import PrismaFQP from '@krsbx/prisma-fqp';
import asyncMw from 'async-express-mw';

export const queryParserMw = asyncMw(async (req, res, next) => {
  req.filterQueryParams = req.query.filters ? PrismaFQP(req.query.filters as string) : {};
  delete req.query.filters;
  return next();
});
