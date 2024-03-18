import { IsNotEmpty, Validate, MaxLength, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { PasswordRule } from '../../../core/validation/rules/password.rule';
import { DatabaseUniqueRule } from '../../../core/validation/rules/database-unique.rule';

export class RegisterRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @Validate(DatabaseUniqueRule, ['users', 'email'])
  readonly email: string;

  @Type(() => String)
  @Validate(PasswordRule)
  readonly password: string;

  @Type(() => String)
  @MaxLength(254)
  @IsNotEmpty()
  readonly name: string;

  getUserData() {
    return {
      name: this.name.trim(),
    };
  }
}
