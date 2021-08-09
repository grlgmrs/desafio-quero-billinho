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
  @Min(1)
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsDateString()
  due_date: Date;

  @IsOptional()
  @IsEnum(BillStatus, {
    message: 'status must be "open", "pending", or "paid"',
  })
  status?: BillStatus = BillStatus.Open;
}
