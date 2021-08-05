import { IsNumber, IsOptional } from 'class-validator';
import { Repository } from 'typeorm';

export class PaginateRequestDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  count: number;
}

export interface Paginate<T> {
  page: number;
  items: T[];
}

export class PaginateHelper<T> {
  constructor(private repo: Repository<T>) {}

  async paginate(paginateRequestDto: PaginateRequestDto): Promise<Paginate<T>> {
    const currentPage = paginateRequestDto.page || 1;
    const take = paginateRequestDto.count || 4;

    const [result, _] = await this.repo.findAndCount({
      take,
      skip: (currentPage - 1) * take,
    });

    return <Paginate<T>>{
      page: currentPage,
      items: result,
    };
  }
}
