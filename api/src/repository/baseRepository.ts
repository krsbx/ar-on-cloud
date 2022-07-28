/* eslint-disable @typescript-eslint/ban-ts-comment */
// Keep in mind that this file is automatically generated.
// You can change the content of this file, but it will be overwritten.

import _ from 'lodash';
import { Prisma } from '@prisma/client';
import {
  models,
  ModelName,
  ModelStructure,
  ModelScalarFields,
  AnyRecord,
  Find,
  BaseOption,
  ModelTypes,
} from './models';

/**
 * @param model - The model name
 */

export class BaseRepository<
  Where,
  Select,
  Include,
  Create,
  Update,
  Cursor,
  Order,
  Delegate,
  Scalar,
  Model
> {
  constructor(protected modelName: ModelName) {
    this.modelName = modelName;
  }

  async findAll(
    conditions: Where,
    filterQueryParams: AnyRecord = {},
    options: AnyRecord = {},
    include: Include = {} as Include
  ) {
    const limit = +(options.limit === 'all' ? 0 : _.get(options, 'limit', 10));
    const offset = options.page && options.page > 0 ? limit * (options.page - 1) : 0;
    const otherOptions = _.omit(options, ['limit', 'offset', 'page']);

    const where = { ...conditions, ...filterQueryParams, ...otherOptions };

    return {
      // @ts-ignore
      rows: (await models[this.modelName].findMany({
        where,
        ...(!_.isEmpty(include) && { include }),
        skip: offset,
        ...(limit > 0 && { take: limit }),
      })) as Model[],
      // eslint-disable-next-line no-underscore-dangle
      count: /* @ts-ignore */ (
        await models[this.modelName].aggregate({
          where,
          _count: true,
        })
      )._count as number,
    };
  }

  async findOne(
    conditions: Where | number | string,
    option: Find<Select, Include, Cursor, Order, Scalar> = {}
  ) {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return models[this.modelName].findFirst({
      where: dbCond,
      ...option,
    }) as Promise<Model>;
  }

  async create(data: Create, option: BaseOption<Include, Select> = {}) {
    // @ts-ignore
    return models[this.modelName].create({
      data,
      ...option,
    }) as Promise<Model>;
  }

  async update(
    conditions: Where | number | string,
    data: Update | Create,
    option: BaseOption<Include, Select> = {}
  ) {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return models[this.modelName].update({
      data,
      where: dbCond,
      ...option,
    }) as Promise<Model>;
  }

  async delete(conditions: Where | number | string) {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return models[this.modelName].deleteMany({
      where: dbCond,
    }) as Promise<Prisma.BatchPayload>;
  }

  async updateOrCreate(
    conditions: Where | number | string,
    data: Create,
    option: Find<Select, Include, Cursor, Order, Scalar> = {}
  ) {
    const obj = await this.findOne(conditions, option);

    if (obj) return this.update(conditions, data, option);

    return this.create(data);
  }

  async bulkCreate(data: Prisma.Enumerable<Create>, skipDuplicates = true) {
    // @ts-ignore
    return models[this.modelName].createMany({
      data,
      skipDuplicates,
    }) as Promise<Prisma.BatchPayload>;
  }

  async bulkUpdate(where: Where, data: Prisma.Enumerable<Update>) {
    // @ts-ignore
    return models[this.modelName].updateMany({
      data,
      where,
    }) as Promise<Prisma.BatchPayload>;
  }

  get model(): Delegate {
    // @ts-ignore
    return models[this.modelName];
  }
}

const factory = <T extends ModelName>(model: T) =>
  new BaseRepository<
    ModelTypes[T]['Where'],
    ModelTypes[T]['Select'],
    ModelTypes[T]['Include'],
    ModelTypes[T]['Create'],
    ModelTypes[T]['Update'],
    ModelTypes[T]['Cursor'],
    ModelTypes[T]['Order'],
    ModelTypes[T]['Delegate'],
    ModelScalarFields<T>,
    ModelStructure[T]
  >(model);

export default factory;
