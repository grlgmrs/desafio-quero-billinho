import { Bill } from '../entities/bill.entity';
import { Enrollment } from '../entities/enrollment.entity';

export default class BillGeneratorHelper {
  constructor(private enrollment: Enrollment) {}

  generateBill(currentInstallment: number): Bill {
    const amount = Math.ceil(
      this.enrollment.amount / this.enrollment.installments,
    );
    const due_date = this.generateDueDate(currentInstallment);

    return <Bill>{ amount, due_date };
  }

  private generateDueDate(installment: number): Date {
    const now = new Date();
    const originalDueDay = this.enrollment.due_day;
    const skipThisMonth = now.getUTCDate() < originalDueDay ? 0 : 1;
    const dueMonth = now.getUTCMonth() + skipThisMonth + installment;
    const dueYear = now.getUTCFullYear();

    const dueDate = new Date(dueYear, dueMonth, 0);

    if (originalDueDay < dueDate.getUTCDate()) {
      dueDate.setDate(originalDueDay);
    }

    return dueDate;
  }
}
