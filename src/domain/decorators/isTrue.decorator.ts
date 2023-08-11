import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsTrue(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: boolean, args: ValidationArguments) {
          return value === true
        },
        defaultMessage(validationArguments?: ValidationArguments) {
          return `${property} deve(m) ser verdadeiro(s).`
        }
      },
    });
  };
}
