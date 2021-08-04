import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentMethod {
  CreditCard = 'credit_card',
  Boleto = 'boleto',
}

@Entity({ name: 'students' })
export class Student {
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
