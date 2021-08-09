import { Student } from '../../students/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bill } from './bill.entity';
import { CreateEnrollmentDto } from '../dto/enrollments/create-enrollment.dto';

@Entity('enrollments')
export class Enrollment {
  constructor(createEnrollmentDto?: CreateEnrollmentDto) {
    if (createEnrollmentDto) {
      this.amount = createEnrollmentDto.amount;
      this.due_day = createEnrollmentDto.due_day;
      this.installments = createEnrollmentDto.installments;
      this.student_id = createEnrollmentDto.student_id;
    }
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: number;

  @Column()
  installments: number;

  @Column()
  due_day: number;

  @Column()
  student_id: number;

  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'student_id' })
  student: number;

  @OneToMany(() => Bill, (bill) => bill.enrollment, {
    cascade: ['insert'],
  })
  bills: Bill[];
}
