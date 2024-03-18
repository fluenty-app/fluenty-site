import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LoginRequestDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
