// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';
// import { Injectable } from '@nestjs/common';
// import { UserService } from './user.service';

// @ValidatorConstraint({ async: true })
// @Injectable()
// export class IsEmailAlreadyExistConstraint
//   implements ValidatorConstraintInterface
// {
//   constructor(private userService: UserService) {}
//   async validate(email: string) {
//     console.log(this.userService);

//     const user = await this.userService.getByEmail(email);

//     return !user;
//   }
// }

// export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
//   return function (object: any, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsEmailAlreadyExistConstraint,
//     });
//   };
// }

import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from './user.service';

@ValidatorConstraint({ name: 'isEmailUserAlreadyExist', async: true })
@Injectable()
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(protected readonly usersService: UserService) {}

  async validate(text: string) {
    return !(await this.usersService.getByEmail(text));
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}
