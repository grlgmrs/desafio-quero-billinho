import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from './create-student.dto';

describe('Validate Pipes in CreateStudentDto', () => {
  let target: ValidationPipe;
  let createStudantDtoMetadata: ArgumentMetadata;

  beforeEach(async () => {
    target = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    createStudantDtoMetadata = {
      type: 'body',
      metatype: CreateStudentDto,
    };
  });

  it('Validate CreateStudentDto when empty object is provided', async () => {
    const dataToTest = {};

    await target
      .transform(dataToTest, createStudantDtoMetadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual([
          'name should not be empty',
          'cpf is not a valid cpf',
          'paymentMethod should not be empty',
          'paymentMethod must be "credit_card" or "boleto"',
        ]);
      });
  });

  it('Validate CreateStudentDto when invalid cpf is provided', async () => {
    const dataToTest = {
      name: 'Joao da Silva',
      cpf: '11111111111',
      paymentMethod: 'credit_card',
    };

    await target
      .transform(dataToTest, createStudantDtoMetadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual(['cpf is not a valid cpf']);
      });
  });

  it('Validate CreateStudentDto when invalid payment_method is provided', async () => {
    const dataToTest = {
      name: 'Joao da Silva',
      cpf: '566.262.960-94',
      paymentMethod: 'paypal',
    };

    await target
      .transform(dataToTest, createStudantDtoMetadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual([
          'paymentMethod must be "credit_card" or "boleto"',
        ]);
      });
  });

  it('Validate CreateStudentDto when invalid birthdate is provided', async () => {
    const dataToTest = {
      name: 'Joao da Silva',
      cpf: '566.262.960-94',
      birthdate: '2000-31-03T00:00:00.000Z',
      paymentMethod: 'credit_card',
    };

    await target
      .transform(dataToTest, createStudantDtoMetadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual([
          'birthdate must be a valid ISO 8601 date string',
        ]);
      });
  });

  it('Validate CreateStudentDto when all fields are valid', async () => {
    const dataToTest = {
      name: 'Joao da Silva',
      cpf: '566.262.960-94',
      birthdate: '2000-08-03T00:00:00.000Z',
      paymentMethod: 'credit_card',
    };

    await target
      .transform(dataToTest, createStudantDtoMetadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual([
          'paymentMethod must be "credit_card" or "boleto"',
        ]);
      });
  });
});
