import { PaymentMethod } from '@modules/students/dto/create-student.dto';
import * as faker from 'faker';

export const randomPaymentMethod = (): PaymentMethod =>
  PaymentMethod[
    faker.helpers.replaceSymbolWithNumber(
      faker.random.arrayElement(Object.getOwnPropertyNames(PaymentMethod)),
    )
  ];
