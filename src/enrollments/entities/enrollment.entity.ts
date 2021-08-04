import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bill } from './bill.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: number;

  @Column()
  installments: number;

  @Column()
  due_day: number;

  @ManyToOne(() => Student, (student) => student.enrollments)
  student: number;

  @OneToMany(() => Bill, (bill) => bill.enrollment)
  bills: Bill[];
}
