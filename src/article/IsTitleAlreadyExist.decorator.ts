import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { ArticleService } from './article.service';

@ValidatorConstraint({ name: 'isEmailUserAlreadyExist', async: true })
@Injectable()
export class IsTitleAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(protected readonly articleService: ArticleService) {}

  async validate(text: string) {
    return !(await this.articleService.getArticleBy({ title: text }));
  }
}

export function IsTitleAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTitleAlreadyExistConstraint,
    });
  };
}
