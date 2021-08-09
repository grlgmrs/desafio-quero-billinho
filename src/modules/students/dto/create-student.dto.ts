import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsValidCPF } from '@shared/validators/is-valid-cpf.rule';

export enum PaymentMethod {
  CreditCard = 'credit_card',
  Boleto = 'boleto',
}

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
    message: 'payment_method must be "credit_card" or "boleto"',
  })
  @IsNotEmpty()
  payment_method: PaymentMethod;
}
