import _ from 'lodash';

export const castTo = <T>(value: unknown) => value as T;

// eslint-disable-next-line @typescript-eslint/ban-types
export const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  property: Y
): obj is X & Record<Y, unknown> => obj.hasOwnProperty(property);

export const createFullName = (profile: CloudAR.Resource.Profile) =>
  _(profile).pick(['firstName', 'lastName']).map(_.trim).compact().join(' ');
