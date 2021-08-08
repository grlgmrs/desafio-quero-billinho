import { CreateBillDto } from '@modules/enrollments/dto/create-bill.dto';
import { Bill } from '@modules/enrollments/entities/bill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GenerateBillHelper } from './helpers/generate-bill-helper';
import { IBillRepository } from './ibill-repository';

export class BillsRepository
  extends GenerateBillHelper
  implements IBillRepository
{
  constructor(@InjectRepository(Bill) private billsRepo: IBillRepository) {
    super();
  }

  create(bill: CreateBillDto): Bill;
  create(bills: CreateBillDto[]): Bill[];
  create(bills: CreateBillDto | CreateBillDto[]): Bill | Bill[] {
    if (Array.isArray(bills)) {
      return this.billsRepo.create(bills);
    }

    return this.billsRepo.create(bills);
  }

  save(bill: CreateBillDto): Promise<Bill>;
  save(bills: CreateBillDto[]): Promise<Bill[]>;
  save(bills: any): Promise<Bill | Bill[]> {
    if (Array.isArray(bills)) {
      return this.billsRepo.save(bills);
    }

    return this.billsRepo.save(bills);
  }
}
