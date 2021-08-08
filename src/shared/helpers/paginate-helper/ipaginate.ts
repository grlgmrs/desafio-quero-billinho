import { PaginateRequestDto } from './dto/paginate-request.dto';

export interface IPaginate<T> {
  page: number;
  items: T[];
}

export interface IFindManyOptions {
  relations?: string[];
  take?: number;
  skip?: number;
}

export interface IPaginateHelper<T> {
  paginate(
    paginateRequestDto: PaginateRequestDto,
    relations?: string[],
  ): Promise<IPaginate<T>>;
}

export interface IPaginateRepository<T> extends IPaginateHelper<T> {
  findAndCount(options?: IFindManyOptions): Promise<[T[], number]>;
}
