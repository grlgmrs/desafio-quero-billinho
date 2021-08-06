import { Bill } from '../entities/bill.entity';

export interface IBillRepository {
  create(createEnrollmentDto: Bill[]): Bill[];
}
