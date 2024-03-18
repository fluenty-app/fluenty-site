import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import { DataSource } from "typeorm";
import { VerificationToken } from "../../../components/verification-tokens/entities/verification-token.entity";
import { HasVerificationTokenInterface } from "../../../components/verification-tokens/interfaces/has-verification-token.interface";
import Lang, { trans } from "../../../lang";

@Injectable()
@ValidatorConstraint({name: 'VerifiedVerificationToken', async: true})
export class VerifiedVerificationTokenRule implements ValidatorConstraintInterface {
  constructor(
    protected dataSource: DataSource,
  ) {
    //
  }

  async validate(value: any, validationArguments?: ValidationArguments) {
    if (!value) {
      return false;
    }

    const request = <HasVerificationTokenInterface>validationArguments.object;

    return this.dataSource
      .getRepository(VerificationToken)
      .createQueryBuilder('verificationTokens')
      .where('verificationTokens.token = :token', {token: value})
      .andWhere('verificationTokens.receiver = :receiver', {receiver: request.getReceiver()})
      .andWhere('verificationTokens.verifiedAt IS NOT NULL')
      .getExists()
  }

  defaultMessage(args: ValidationArguments) {
    return trans(Lang.validation.verifiedVerificationToken);
  }
}
