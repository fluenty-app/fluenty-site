import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import { UsernameModel } from "../../../components/username/username.model";
import { UsernameEnum } from "../../../components/username/username.enum";
import { SettingsStore } from "../../../components/settings/settings.store";
import Lang from "../../../lang";

@Injectable()
@ValidatorConstraint({name: 'emailVendor'})
export class EmailVendorRule implements ValidatorConstraintInterface {
  protected vendors = [];

  constructor(
    protected settingsStore: SettingsStore,
  ) {
    settingsStore.get('registration_email_white_list', [])
      .then((data) => this.vendors = data);
  }

  validate(value: UsernameModel | string, validationArguments?: ValidationArguments) {
    if (!value || (value instanceof UsernameModel && value.getType() !== UsernameEnum.EMAIL)) {
      return true;
    }

    const email: string = value instanceof UsernameModel ? value.getUsername() : value;

    return this.vendors.includes(
      email.split('@')[1]
    );
  }

  defaultMessage(args: ValidationArguments) {
    return Lang.validation.emailVendor;
  }
}
