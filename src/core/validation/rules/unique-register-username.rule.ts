import { ValidatorConstraint } from "class-validator";
import { Injectable } from "@nestjs/common";
import { DatabaseUniqueRule } from "./database-unique.rule";

@Injectable()
@ValidatorConstraint({name: 'unique_register_username', async: true})
export class UniqueRegisterUsernameRule extends DatabaseUniqueRule {
  // async validate(value: UsernameModel, validationArguments?: ValidationArguments) {
  //   if (!value) {
  //     return true;
  //   }
  //
  //   const field = value.getTypeField();
  //
  //   return !await this.dataSource
  //     .getRepository(User)
  //     .createQueryBuilder()
  //     .where(field + ' = :field', {field: value.getUsername()})
  //     .getExists()
  // }
  //
  //
  // defaultMessage(args: ValidationArguments): string {
  //
  //   const value = args.value[args.property];
  //
  //   if (validateEmail(value)) {
  //     return trans(Lang.validation.unique, {
  //       attribute: trans(Lang.validation.attributes['email'] ?? args.property),
  //     });
  //   }
  //
  //   const phone = parsePhoneNumber(value, "IR");
  //
  //   if (phone && phone.isValid()) {
  //     return trans(Lang.validation.unique, {
  //       attribute: trans(Lang.validation.attributes['mobile'] ?? args.property),
  //     });
  //   }
  //
  //   return value;
  // }
}
