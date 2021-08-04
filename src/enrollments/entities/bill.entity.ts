import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Enrollment } from './enrollment.entity';

export enum BillStatus {
  Open = 'open',
  Pending = 'pending',
  Paid = 'paid',
}

@Entity('bills')
export class Bill {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: number;

  @Column({ type: 'timestamptz' })
  due_date: Date;

  @Column()
  status: BillStatus = BillStatus.Open;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.bills)
  enrollment: Enrollment;
}
