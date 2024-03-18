import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import { UsernameModel } from "../../../components/username/username.model";
import { UsernameEnum } from "../../../components/username/username.enum";
import Lang from "../../../lang";

@Injectable()
@ValidatorConstraint({name: 'validEmailMobile'})
export class ValidEmailMobileRule implements ValidatorConstraintInterface {
  constructor(
    //
  ) {
    //
  }

  validate(value: UsernameModel, validationArguments?: ValidationArguments) {
    if (!value) {
      return true;
    }

    return [
      UsernameEnum.EMAIL,
      UsernameEnum.MOBILE,
    ].includes(<number>value.getType());
  }

  defaultMessage(args: ValidationArguments) {
    return Lang.validation.validMobileEmail;
  }
}
