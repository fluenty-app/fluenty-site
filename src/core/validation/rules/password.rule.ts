import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import Lang from "../../../lang";

@Injectable()
@ValidatorConstraint({name: 'password'})
export class PasswordRule implements ValidatorConstraintInterface {
  static regex = /(?=^[\x00-\x7F]{6,32}$)(?=.*[a-zA-Z]+)(?=.*[0-9]+)/;

  validate(value: string, validationArguments?: ValidationArguments) {
    return PasswordRule.regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return Lang.validation.password;
  }
}
