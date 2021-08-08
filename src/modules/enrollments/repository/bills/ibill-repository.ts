import { CreateBillDto } from '@modules/enrollments/dto/create-bill.dto';
import { Bill } from '@modules/enrollments/entities/bill.entity';

export interface IBillRepository {
  create(bill: CreateBillDto): Bill;
  create(bills: CreateBillDto[]): Bill[];

  save(bill: CreateBillDto): Promise<Bill>;
  save(bills: CreateBillDto[]): Promise<Bill[]>;
}
