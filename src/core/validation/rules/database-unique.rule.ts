import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import { DataSource, Repository } from "typeorm";
import Lang, { trans } from "../../../lang";

@Injectable()
@ValidatorConstraint({name: 'unique', async: true})
export class DatabaseUniqueRule implements ValidatorConstraintInterface {
  constructor(
    protected dataSource: DataSource,
  ) {
    //
  }

  async validate(value: any, validationArguments?: ValidationArguments) {
    if (!value) {
      return true;
    }

    const repository: Repository<any> = this.getRepository(validationArguments.constraints[0]);

    const field = validationArguments.constraints[1] ?? validationArguments.property;

    const exceptFactory = validationArguments.constraints[2];

    const except = exceptFactory instanceof Function ? exceptFactory(validationArguments) : exceptFactory;

    const query = repository.createQueryBuilder()
      .where(field + ' = :field', {field: value});

    if (except) {
      query.andWhere('id != :id', {id: except});
    }

    return !await query.getExists();
  }

  getRepository(model) {
    return this.dataSource.getRepository(model);
  }

  defaultMessage(args: ValidationArguments) {
    return trans(Lang.validation.unique, {
      attribute: trans(Lang.validation.attributes[args.property] ?? args.property),
    });
  }
}
