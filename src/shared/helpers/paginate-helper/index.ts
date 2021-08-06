import { PaginateRequestDto } from './dto/paginate-request.dto';
import { IPaginate, IPaginateRepository } from './ipaginate';

export class PaginateHelper<T> {
  constructor(
    private repo: IPaginateRepository<T>,
    private relations?: string[],
  ) {}

  async paginate(
    paginateRequestDto: PaginateRequestDto,
  ): Promise<IPaginate<T>> {
    const currentPage = paginateRequestDto.page || 1;
    const take = paginateRequestDto.count || 4;

    const [result, _] = await this.repo.findAndCount({
      relations: this.relations,
      take,
      skip: (currentPage - 1) * take,
    });

    return <IPaginate<T>>{
      page: currentPage,
      items: result,
    };
  }
}

export { IPaginate } from './ipaginate';
export { PaginateRequestDto } from './dto/paginate-request.dto';
