import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateBillDto } from '../dto/create-bill.dto';
import { Enrollment } from './enrollment.entity';

export enum BillStatus {
  Open = 'open',
  Pending = 'pending',
  Paid = 'paid',
}

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
