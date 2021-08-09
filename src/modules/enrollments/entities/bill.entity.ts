import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BillStatus, CreateBillDto } from '../dto/bills/create-bill.dto';
import { Enrollment } from './enrollment.entity';

@Entity('bills')
export class Bill {
  constructor(bill?: CreateBillDto) {
    if (bill) {
      this.amount = bill.amount;
      this.due_date = bill.due_date;
    }
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: number;

  @Column({ type: 'timestamptz' })
  due_date: Date;

  @Column()
  status: BillStatus = BillStatus.Open;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.bills)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;
}
