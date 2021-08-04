import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsValidCPF } from '../../validators/is-valid-cpf.rule';
import { PaymentMethod } from '../entities/student.entity';

export class CreateStudentDto {
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value.replace(/[^0-9]/gm, ''))
  @IsValidCPF()
  cpf: string;

  @IsOptional()
  @IsDateString()
  birthdate: Date;

  @IsEnum(PaymentMethod, {
    message: 'paymentMethod must be "credit_card" or "boleto"',
  })
  @IsNotEmpty()
  payment_method: PaymentMethod;
}
