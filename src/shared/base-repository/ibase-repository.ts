import {
  IFindManyOptions,
  IPaginateHelper,
} from './helpers/paginate-helper/ipaginate';

export interface IBaseRepository<T> extends IPaginateHelper<T> {
  findAndCount(options?: IFindManyOptions): Promise<[T[], number]>;
}
