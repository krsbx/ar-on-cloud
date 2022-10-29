import jwtToken from 'jsonwebtoken';
import _ from 'lodash';
import type { UserRole } from 'types/resource';

type TokenPayload = { id: number; role: UserRole };

const jwtSecret = _.get(process.env, 'JWT_SECRET');

export const signAccessToken = (payload: TokenPayload, always = false) =>
  jwtToken.sign(payload, jwtSecret!, { ...(!always && { expiresIn: '3h' }) });

export const verifyAccessToken = async (token: string) =>
  new Promise<TokenPayload | false>((resolve) => {
    jwtToken.verify(token, jwtSecret!, (err, decoded) => {
      if (err) resolve(false);

      resolve(decoded as TokenPayload | false);
    });
  });

export default { signAccessToken, verifyAccessToken };
