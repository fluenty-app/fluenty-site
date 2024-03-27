import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import Lang, { trans } from "../../../lang";

@Injectable()
@ValidatorConstraint({name: 'confirmed'})
export class ConfirmedRule implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments) {
    const field = validationArguments.constraints?.[0] ?? (validationArguments.property + "Confirmation");

    return validationArguments.object[field] === value;
  }

  defaultMessage(args: ValidationArguments) {
    return trans(Lang.validation.confirmed, {
      attribute: trans(Lang.validation.attributes[args.property] ?? args.property),
    });
  }
}
