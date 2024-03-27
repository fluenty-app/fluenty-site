import { Global, Module } from '@nestjs/common';
import { DatabaseExistsRule } from "./rules/database-exists.rule";
import { UniqueRegisterUsernameRule } from "./rules/unique-register-username.rule";
import { DatabaseUniqueRule } from "./rules/database-unique.rule";


@Global()
@Module({
  imports: [
    //
  ],
  controllers: [
    //
  ],
  providers: [
    DatabaseExistsRule,
    DatabaseUniqueRule,
    UniqueRegisterUsernameRule,
  ],
  exports: [
    DatabaseExistsRule,
    DatabaseUniqueRule,
    UniqueRegisterUsernameRule,
  ],
})
export class ValidationModule {
  //
}
