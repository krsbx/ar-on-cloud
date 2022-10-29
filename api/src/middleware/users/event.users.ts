import asyncMw from 'express-asyncmw';
import httpStatus from 'http-status';
import _ from 'lodash';
import repository from 'repository';
import { USER_ROLE } from 'utils/constant';
import { compareText } from 'utils/encryption';
import { createNotFoundResponse, createOnlyAdminResponse } from 'utils/responses';
import { signAccessToken, verifyAccessToken } from 'utils/token';

export const authMw = asyncMw(async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      code: 401,
      status: httpStatus['401_NAME'],
      message: 'Unauthorized',
    });
  }

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.split(' ')[1];

  const isVerifiedToken = await verifyAccessToken(bearerToken);

  if (!isVerifiedToken) {
    return res.status(401).json({
      code: 401,
      status: httpStatus['401_NAME'],
      message: 'Invalid token',
    });
  }

  req.userAuth = await repository.user.findOne(isVerifiedToken.id);
  req.isAdmin = req.userAuth.role === USER_ROLE.ADMIN;

  return next();
});

export const loginMw = asyncMw(async (req, res) => {
  const user = await repository.user.findOne({ email: req.body.email });

  if (!user) {
    const response = createNotFoundResponse('User');
    return res.status(404).json(response);
  }

  if (!(await compareText(req.body.password, user.password))) {
    return res.status(401).json({
      code: 401,
      status: httpStatus['401_NAME'],
      message: 'Invalid password',
    });
  }

  const token = signAccessToken(_.pick(user, ['id', 'role']), req.body.always);

  return res.json({ id: user.id, token });
});

export const isAdminMw = asyncMw(async (req, res, next) => {
  if (!req.isAdmin) {
    const response = createOnlyAdminResponse('Only Admin Allowed');
    return res.status(403).json(response);
  }

  return next();
});
