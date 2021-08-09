import { PaginateHelper } from './helpers/paginate-helper';
import { PaginateRequestDto } from './helpers/paginate-helper/dto/paginate-request.dto';
import {
  IFindManyOptions,
  IPaginate,
  IPaginateHelper,
} from './helpers/paginate-helper/ipaginate';

export abstract class BaseRepository<T> implements IPaginateHelper<T> {
  abstract findAndCount(options: IFindManyOptions): Promise<[T[], number]>;

  async paginate(
    paginateRequestDto: PaginateRequestDto,
    relations?: string[],
  ): Promise<IPaginate<T>> {
    const paginateHelper = new PaginateHelper(this);

    return paginateHelper.paginate(paginateRequestDto, relations);
  }
}
