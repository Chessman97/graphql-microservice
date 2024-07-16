import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function AtLeastOneNotEmpty(properties: string[], validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'AtLeastOneNotEmpty',
      target: object.constructor,
      propertyName: propertyName,
      constraints: properties,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const props: string[] = [];
          for (const propName of args.constraints) {
            const prop = (args.object as any)[propName];
            if (prop) {
              props.push(propName);
            }
          }
          if (props.length === args.constraints.length || props.length === 0) {
            return false;
          }
          return true;
        },
      },
    });
  };
}
