import { CreateBillDto } from '@modules/enrollments/dto/create-bill.dto';
import { Bill } from '@modules/enrollments/entities/bill.entity';
import { IGenerateBillHelper } from './helpers/igenerate-bill-helper';

export interface IBillRepository extends IGenerateBillHelper {
  create(bill: CreateBillDto): Bill;
  create(bills: CreateBillDto[]): Bill[];

  save(bill: CreateBillDto): Promise<Bill>;
  save(bills: CreateBillDto[]): Promise<Bill[]>;
}
