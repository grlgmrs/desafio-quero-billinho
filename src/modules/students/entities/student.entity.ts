import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateStudentDto, PaymentMethod } from '../dto/create-student.dto';

@Entity({ name: 'students' })
export class Student {
  constructor(createStudentDto?: CreateStudentDto) {
    if (createStudentDto) {
      this.name = createStudentDto.name;
      this.cpf = createStudentDto.cpf;
      this.birthdate = createStudentDto.birthdate;
      this.payment_method = createStudentDto.payment_method;
    }
  }

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: 'timestamptz', nullable: true })
  birthdate: Date;

  @Column('varchar')
  payment_method: PaymentMethod;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
