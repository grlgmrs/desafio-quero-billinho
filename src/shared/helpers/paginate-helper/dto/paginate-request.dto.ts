import { IsNumber, IsOptional } from 'class-validator';

export class PaginateRequestDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  count: number;
}
