import { Global, Module } from '@nestjs/common';
import { DatabaseExistsRule } from "./rules/database-exists.rule";
import { UniqueRegisterUsernameRule } from "./rules/unique-register-username.rule";
import { ValidEmailMobileRule } from "./rules/valid-email-mobile.rule";
import { EmailVendorRule } from "./rules/email-vendor.rule";
import { SettingsModule } from "../../components/settings/settings.module";
import { DatabaseUniqueRule } from "./rules/database-unique.rule";
import { VerifiedVerificationTokenRule } from "./rules/verified-verification-token.rule";


@Global()
@Module({
  imports: [
    SettingsModule,
  ],
  controllers: [
    //
  ],
  providers: [
    DatabaseExistsRule,
    DatabaseUniqueRule,
    UniqueRegisterUsernameRule,
    ValidEmailMobileRule,
    EmailVendorRule,
    VerifiedVerificationTokenRule,
  ],
  exports: [
    DatabaseExistsRule,
    DatabaseUniqueRule,
    UniqueRegisterUsernameRule,
    ValidEmailMobileRule,
    EmailVendorRule,
    VerifiedVerificationTokenRule,
  ],
})
export class ValidationModule {
  //
}
