import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { BillStatus } from '../../entities/bill.entity';

export class CreateBillDto {
  @Min(1)
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsDateString()
  due_date: Date;

  @IsEnum(BillStatus, {
    message: 'status must be "open", "pending", or "paid"',
  })
  status?: BillStatus = BillStatus.Open;
}
