import { PaginateRequestDto } from './dto/paginate-request.dto';
import { IFindManyOptions, IPaginate, IPaginateHelper } from './ipaginate';

export abstract class PaginateEntity<T> implements IPaginateHelper<T> {
  abstract findAndCount(options: IFindManyOptions): Promise<[T[], number]>;

  async paginate(
    { count, page }: PaginateRequestDto,
    relations?: string[],
  ): Promise<IPaginate<T>> {
    const currentPage = page || 1;
    const take = count || 4;

    const [result, _] = await this.findAndCount({
      relations: relations,
      take,
      skip: (currentPage - 1) * take,
    });

    return <IPaginate<T>>{
      page: currentPage,
      items: result,
    };
  }
}
