import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { CreateBillDto } from './create-bill.dto';

describe('Validate Pipes in CreateBillDto', () => {
  let target: ValidationPipe;
  let createStudantDtoMetadata: ArgumentMetadata;

  beforeEach(async () => {
    target = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    createStudantDtoMetadata = {
      type: 'body',
      metatype: CreateBillDto,
    };
  });

  it('Validate CreateBillDto when fields are empty or wrong', async () => {
    const dataToTest = {
      due_date: '2021-31-08T00:00:00.000Z',
      status: 'whatever',
    };

    await target
      .transform(dataToTest, createStudantDtoMetadata)
      .catch((err) => {
        expect(err.getResponse().message).toEqual([
          'amount must be a number conforming to the specified constraints',
          'amount must not be less than 1',
          'due_date must be a valid ISO 8601 date string',
          'status must be "open", "pending", or "paid"',
        ]);
      });
  });
});
