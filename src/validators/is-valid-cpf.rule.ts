import { cpf } from 'cpf-cnpj-validator';
import {
  buildMessage,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsValidCPF(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return cpf.isValid(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix, args: ValidationArguments) =>
            `${eachPrefix}$property is not a valid cpf`,
          validationOptions,
        ),
      },
    });
  };
}
