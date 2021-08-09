import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export enum BillStatus {
  Open = 'open',
  Pending = 'pending',
  Paid = 'paid',
}

export class CreateBillDto {
  @ApiProperty({
    description:
      'Amount of monthly paiment (bill). Should be equal Enrollment.amount / Enrollment.installments.',
  })
  @Min(1)
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Due date of monthly payment (bill).' })
  @IsOptional()
  @IsDateString()
  due_date: Date;

  @ApiProperty({
    description:
      'Status of monthly payment (bill). Must be "open", "pending" or "paid". ',
    enum: BillStatus,
  })
  @IsOptional()
  @IsEnum(BillStatus, {
    message: 'status must be "open", "pending", or "paid"',
  })
  status?: BillStatus = BillStatus.Open;
}
