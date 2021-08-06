import { PaymentMethod } from '@modules/students/entities/student.entity';
import * as faker from 'faker';

export const randomPaymentMethod = (): PaymentMethod =>
  PaymentMethod[
    faker.helpers.replaceSymbolWithNumber(
      faker.random.arrayElement(Object.getOwnPropertyNames(PaymentMethod)),
    )
  ];
