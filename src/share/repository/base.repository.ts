import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository, SaveOptions } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T> {
  protected constructor(protected readonly repo: Repository<T>) {}

  save(entity: DeepPartial<T>, options?: SaveOptions): Promise<T> {
    return this.repo.save(this.repo.create(entity), options);
  }

  saveAll(entities: DeepPartial<T>[], options?: SaveOptions): Promise<T[]> {
    return this.repo.save(this.repo.create(entities), options);
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repo.findOne(options);
  }

  findOneBy(where: FindOptionsWhere<T>): Promise<T> {
    return this.repo.findOneBy(where);
  }

  findBy(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.repo.findBy(where);
  }

  find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repo.find(options);
  }

  existsBy(where: FindOptionsWhere<T>): Promise<boolean> {
    return this.repo.existsBy(where);
  }

  update(criteria: FindOptionsWhere<T>, partial: QueryDeepPartialEntity<T>) {
    return this.repo.update(criteria, partial);
  }

  delete(criteria: FindOptionsWhere<T>) {
    return this.repo.delete(criteria);
  }

  increment(conditions: FindOptionsWhere<T>, propertyPath: string, value: number) {
    return this.repo.increment(conditions, propertyPath, value);
  }

  count(options?: FindManyOptions<T>): Promise<number> {
    return this.repo.count(options);
  }

  remove(entity: T): Promise<T> {
    return this.repo.remove(entity);
  }

  removeAll(entities: T[]): Promise<T[]> {
    return this.repo.remove(entities);
  }
}
