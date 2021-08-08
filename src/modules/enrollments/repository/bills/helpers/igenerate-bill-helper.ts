import { Bill } from '@modules/enrollments/entities/bill.entity';
import { Enrollment } from '@modules/enrollments/entities/enrollment.entity';

export interface IGenerateBillHelper {
  generate(enrollment: Enrollment): Bill[];
}
