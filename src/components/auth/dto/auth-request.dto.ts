import { User } from '../../users/schemas/user.schema';

export class AuthRequestDto {
  protected auth: User;

  setAuth(auth: User) {
    this.auth = auth;

    return this;
  }
}
