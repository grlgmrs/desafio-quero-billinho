import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginateRequestDto {
  @ApiProperty({ description: 'Page to get data.' })
  @IsOptional()
  @IsNumber()
  page: number;

  @ApiProperty({ description: 'Total items per page.' })
  @IsOptional()
  @IsNumber()
  count: number;
}
