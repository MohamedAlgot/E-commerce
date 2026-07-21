import { Model, ProjectionType, QueryFilter, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<T> {
  constructor(private _model: Model<T>) {}

  get model() {
    return this._model;
  }
  public async create(iteam: Partial<T>) {
    const doc = new this._model(iteam);
    return doc.save();
  }

  public async getOne(
    filter: QueryFilter<T>,
    Projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this._model.findOne(filter, Projection, options);
  }
  public async getAll(
    filter: QueryFilter<T>,
    Projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this._model.find(filter, Projection, options);
  }

  public async updateOne(filter: QueryFilter<T>,update:UpdateQuery<T>) {
    return this._model.findOneAndUpdate(filter,update);
  }

  public async removeOne(filter: QueryFilter<T>) {
    return this._model.deleteOne(filter);
  }
}
