import Lang, { trans } from '../../../lang';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Collection, Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
@ValidatorConstraint({name: 'unique', async: true})
export class DatabaseUniqueRule implements ValidatorConstraintInterface {
  constructor(
    @InjectConnection() protected dataSource: Connection,
  ) {
    //
  }

  async validate(value: any, validationArguments?: ValidationArguments) {
    if (!value) {
      return true;
    }

    const collection: Collection = this.getCollection(validationArguments.constraints[0]);

    const field = validationArguments.constraints[1] ?? validationArguments.property;

    const exceptFactory = validationArguments.constraints[2];

    const except = exceptFactory instanceof Function ? exceptFactory(validationArguments) : exceptFactory;

    const $match:Record<any, any> = {
      [field]: value,
    };

    if (except) {
      $match._id = {
        $ne: except,
      };
    }

    return !await collection.findOne($match);
  }

  getCollection(model) {
    return this.dataSource.collections[model];
  }

  defaultMessage(args: ValidationArguments) {
    return trans(Lang.validation.unique, {
      attribute: trans(Lang.validation.attributes[args.property] ?? args.property),
    });
  }
}
