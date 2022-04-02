// Use for the base repository/model sources
import _ from 'lodash';
import { PrismaClient, Profile, User } from '@prisma/client';

export const prisma = new PrismaClient();

export type Model = keyof Omit<
  typeof prisma,
  | '$on'
  | '$connect'
  | '$disconnect'
  | '$use'
  | '$executeRaw'
  | '$executeRawUnsafe'
  | '$queryRaw'
  | '$queryRawUnsafe'
  | '$transaction'
>;

export type ModelStructure = {
  user: User;
  profile: Profile;
};

export const createRow =
  <T extends Model>(model: T) =>
  (data: ModelStructure[T]) =>
    // @ts-ignore
    prisma[model].create({
      data,
    });

export const findAll =
  (model: Model = 'user') =>
  (conditions: any, filterQueryParams: any = {}, options: any = {}) => {
    const limit = +(options.limit === 'all' ? 0 : _.get(options, 'limit', 10));
    const offset = options.page && options.page > 0 ? limit * (options.page - 1) : 0;
    const otherOptions = _.omit(options, ['limit', 'offset']);

    const where = { ...conditions, ...otherOptions };

    // @ts-ignore
    return prisma[model].findMany({
      where,
      skip: offset,
      take: limit,
    });
  };

export const findOne =
  (model: Model) =>
  (conditions: object | string | number, option: any = {}) => {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return prisma[model].findFirst({ where: dbCond }, option);
  };

export const updateRow =
  <T extends Model>(model: T) =>
  (conditions: object | string | number, data: Partial<ModelStructure[T]>) => {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };
    const dbData = _.isObject(data) ? data : { data };

    // @ts-ignore
    return prisma[model].update({ data: dbData, where: dbCond });
  };

export const deleteRow = (model: Model) => (conditions: object | string | number) => {
  const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

  // @ts-ignore
  return prisma[model].delete({ where: dbCond });
};

export const modelToResource = async (model: any) => model;

export const resourceToModel = async (resource: any) => resource;

export const models = _.omit(prisma, [
  '$on',
  '$connect',
  '$disconnect',
  '$use',
  '$executeRaw',
  '$executeRawUnsafe',
  '$queryRaw',
  '$queryRawUnsafe',
  '$transaction',
]);

const factory = <T extends Model>(model: T) => ({
  findAll: findAll(model),
  findOne: findOne(model),
  create: createRow(model),
  update: updateRow(model),
  delete: deleteRow(model),
  modelToResource,
  resourceToModel,
  models,
});

export default factory;
