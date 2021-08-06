import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class CreateEnrollmentDto {
  @IsInt()
  @Min(1)
  @IsNumber()
  amount: number;

  @IsInt()
  @Min(1)
  @IsNumber()
  installments: number;

  @IsInt()
  @Max(31)
  @Min(1)
  @IsNumber()
  due_day: number;

  @IsNumber()
  student_id: number;
}
