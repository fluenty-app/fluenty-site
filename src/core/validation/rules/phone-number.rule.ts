import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import parsePhoneNumber from "libphonenumber-js/max";
import Lang from "../../../lang";

@Injectable()
@ValidatorConstraint({name: 'isPhoneNumber'})
export class PhoneNumberRule implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments) {
    const type = validationArguments.constraints[0] ?? null;

    const phone = parsePhoneNumber(value || "", "IR");

    return phone && phone.isValid() && (!type || phone.getType() === type);
  }

  defaultMessage(args: ValidationArguments) {
    return Lang.validation.isPhoneNumber;
  }
}
