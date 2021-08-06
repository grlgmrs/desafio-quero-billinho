import { generateDueDate } from '@shared/utils/due-date-utils';
import { Enrollment } from '../entities/enrollment.entity';
import { Bill } from '../entities/bill.entity';

export default class BillGeneratorHelper {
  constructor(private enrollment: Enrollment) {}

  generateBills(): Bill[] {
    const amount = Math.ceil(
      this.enrollment.amount / this.enrollment.installments,
    );

    const bills: Bill[] = Array.from(
      { length: this.enrollment.installments },
      (_, index) =>
        <Bill>{
          amount,
          due_date: generateDueDate(this.enrollment.due_day, index + 1),
        },
    );

    return bills;
  }
}
