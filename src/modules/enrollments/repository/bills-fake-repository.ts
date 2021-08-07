import { fakePromise } from '@shared/utils/faker/fake-promise';
import { CreateBillDto } from '../dto/create-bill.dto';
import { Bill } from '../entities/bill.entity';
import { IBillRepository } from './ibill-repository';

export class BillsFakeRepository implements IBillRepository {
  create(bill: CreateBillDto): Bill;
  create(bills: CreateBillDto[]): Bill[];
  create(bills: CreateBillDto | CreateBillDto[]): Bill | Bill[] {
    if (Array.isArray(bills)) {
      return bills.map<Bill>((bill: Bill | CreateBillDto) => new Bill(bill));
    }

    return new Bill(bills);
  }

  save(bill: CreateBillDto): Promise<Bill>;
  save(bills: CreateBillDto[]): Promise<Bill[]>;
  async save(bills: CreateBillDto | CreateBillDto[]): Promise<Bill | Bill[]> {
    if (Array.isArray(bills)) {
      const newBills: Bill[] = [];

      for (const key in bills) {
        newBills.push(await this.saveOne(bills[key]));
      }

      return newBills;
    }

    return this.saveOne(bills);
  }
  private bills: Bill[] = [];

  private saveOne(bill: CreateBillDto): Promise<Bill> {
    const newBill = new Bill(bill);
    newBill.id = this.bills.length + 1;

    this.bills.push(newBill);

    return fakePromise(newBill);
  }
}
