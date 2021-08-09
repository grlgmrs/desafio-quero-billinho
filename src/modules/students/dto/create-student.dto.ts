import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsValidCPF } from '@shared/validators/is-valid-cpf.rule';
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentMethod {
  CreditCard = 'credit_card',
  Boleto = 'boleto',
}

export class CreateStudentDto {
  @ApiProperty({ description: 'Name of student.' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Cpf of student. Any non-numeric characters will be removed.',
  })
  @Transform(({ value }) => value.replace(/[^0-9]/gm, ''))
  @IsValidCPF()
  cpf: string;

  @ApiProperty({ description: 'Birthdate of student.', required: false })
  @IsOptional()
  @IsDateString()
  birthdate: Date;

  @ApiProperty({
    description:
      'Payment method used by student. Must be "credit_card" or "boleto"',
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod, {
    message: 'payment_method must be "credit_card" or "boleto"',
  })
  @IsNotEmpty()
  payment_method: PaymentMethod;
}
