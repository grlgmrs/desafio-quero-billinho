import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { CreateEnrollmentDto } from './create-enrollment.dto';

describe('Validate Pipes in CreateEnrollmentDto', () => {
  let target: ValidationPipe;
  let createStudantDtoMetadata: ArgumentMetadata;

  beforeEach(async () => {
    target = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    createStudantDtoMetadata = {
      type: 'body',
      metatype: CreateEnrollmentDto,
    };
  });

  it('Validate CreateEnrollmentDto when empty object is provided', async () => {
    const dataToTest = {};

    await target
      .transform(dataToTest, createStudantDtoMetadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual([
          'amount must be a number conforming to the specified constraints',
          'amount must not be less than 1',
          'amount must be an integer number',
          'installments must be a number conforming to the specified constraints',
          'installments must not be less than 1',
          'installments must be an integer number',
          'due_day must be a number conforming to the specified constraints',
          'due_day must not be less than 1',
          'due_day must not be greater than 31',
          'due_day must be an integer number',
          'student_id must be a number conforming to the specified constraints',
        ]);
      });
  });
});
