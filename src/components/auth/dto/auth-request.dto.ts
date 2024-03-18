import { User } from '../../users/entities/user.entity';

export class AuthRequestDto {
  protected auth: User;

  setAuth(auth: User) {
    this.auth = auth;

    return this;
  }
}
