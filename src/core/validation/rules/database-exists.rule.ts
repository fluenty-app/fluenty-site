import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import { DataSource, Repository } from "typeorm";
import Lang, { trans } from "../../../lang";

@Injectable()
@ValidatorConstraint({name: 'exists', async: true})
export class DatabaseExistsRule implements ValidatorConstraintInterface {
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

    return repository.createQueryBuilder("tableName")
      .where(`tableName.${field} = :field`, {field: value})
      .getExists()
  }

  getRepository(model) {
    return this.dataSource.getRepository(model);
  }

  defaultMessage(args: ValidationArguments) {
    return trans(Lang.validation.exists, {
      attribute: trans(Lang.validation.attributes[args.property] ?? args.property),
    });
  }
}
