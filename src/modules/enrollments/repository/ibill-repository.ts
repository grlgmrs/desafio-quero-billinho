import { CreateBillDto } from '../dto/create-bill.dto';
import { Bill } from '../entities/bill.entity';

export interface IBillRepository {
  create(bill: CreateBillDto): Bill;
  create(bills: CreateBillDto[]): Bill[];

  save(bill: CreateBillDto): Promise<Bill>;
  save(bills: CreateBillDto[]): Promise<Bill[]>;
}
