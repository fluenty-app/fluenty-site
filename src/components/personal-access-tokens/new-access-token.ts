import { PersonalAccessToken } from "./entities/personal-access-token.entity";

export class NewAccessToken {
  constructor(
    public accessToken: PersonalAccessToken,
    public plainTextToken: string,
  ) {
    //
  }
}
