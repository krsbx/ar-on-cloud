import jwtToken from 'jsonwebtoken';
import _ from 'lodash';

type TokenPayload = { id: number; role: CloudAR.Resource.UserRole };

const jwtSecret = _.get(process.env, 'JWT_SECRET');

export const signAccessToken = (payload: TokenPayload, always = false) =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  jwtToken.sign(payload, jwtSecret!, { ...(!always && { expiresIn: '3h' }) });

export const verifyAccessToken = async (token: string) =>
  new Promise<TokenPayload | false>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    jwtToken.verify(token, jwtSecret!, (err, decoded) => {
      if (err) resolve(false);

      resolve(decoded as TokenPayload | false);
    });
  });

export default { signAccessToken, verifyAccessToken };
