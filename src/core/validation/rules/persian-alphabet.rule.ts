import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import Lang from "../../../lang";

@Injectable()
@ValidatorConstraint({name: 'persianAlphabet'})
export class PersianAlphabetRule implements ValidatorConstraintInterface {
  static regex = /^[\u0600-\u06FF\s]*$/u;

  validate(value: string, validationArguments?: ValidationArguments) {
    return PersianAlphabetRule.regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return Lang.validation.password;
  }
}
