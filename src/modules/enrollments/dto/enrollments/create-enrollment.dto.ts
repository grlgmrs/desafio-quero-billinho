import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ description: 'Total value in cents of the enrollment.' })
  @IsInt()
  @Min(1)
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Quantity of enrollment monthly payment.' })
  @IsInt()
  @Min(1)
  @IsNumber()
  installments: number;

  @ApiProperty({ description: 'Enrollment base day for payment expiration.' })
  @IsInt()
  @Max(31)
  @Min(1)
  @IsNumber()
  due_day: number;

  @ApiProperty({ description: 'Owner of enrollment.' })
  @IsNumber()
  student_id: number;
}
