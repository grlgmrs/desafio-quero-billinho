import { Bill } from '@modules/enrollments/entities/bill.entity';
import { Enrollment } from '@modules/enrollments/entities/enrollment.entity';
import { generateDueDate } from '@shared/utils/due-date-utils';
import { IGenerateBillHelper } from './igenerate-bill-helper';

export class GenerateBillHelper implements IGenerateBillHelper {
  generate(enrollment: Enrollment): Bill[] {
    const amount = Math.ceil(enrollment.amount / enrollment.installments);

    const bills: Bill[] = Array.from(
      { length: enrollment.installments },
      (_, index) =>
        new Bill({
          amount,
          due_date: generateDueDate(enrollment.due_day, index + 1),
        }),
    );

    return bills;
  }
}
