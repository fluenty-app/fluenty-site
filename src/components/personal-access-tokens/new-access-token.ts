import { PersonalAccessToken } from './entities/personal-access-token.schema';

export class NewAccessToken {
  constructor(
    public accessToken: PersonalAccessToken,
    public plainTextToken: string,
  ) {
    //
  }
}
