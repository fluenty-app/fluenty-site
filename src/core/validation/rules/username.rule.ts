import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { Injectable } from "@nestjs/common";
import Lang from "../../../lang";

@Injectable()
@ValidatorConstraint({name: 'username_rule'})
export class UsernameRule implements ValidatorConstraintInterface {
  static rules = {
    characterPool: /^[a-zA-Z0-9_.]+$/,
    startingCharacter: /^[a-zA-Z]{1}/,
    endingCharacter: /[a-zA-Z0-9]{1}$/,
    length: /^(?=.{6,20}$).*/,
    consecutivePeriod: /^(?!.*[.]{2,})/,
    consecutiveUnderscore: /^(?!.*[_]{2,})/,
    consecutivePeriodUnderscore: /^(?!.*[._]{2,})/,
  };

  validate(value: string, validationArguments?: ValidationArguments) {
    return !this.getError(value);
  }

  defaultMessage(args: ValidationArguments) {
    return Lang.validation.username[this.getError(args.value)];
  }

  getError(value) {
    for (const [key, rule] of Object.entries(UsernameRule.rules)) {
      if (!rule.test(value)) {
        return key;
      }
    }

    return null;
  }
}
