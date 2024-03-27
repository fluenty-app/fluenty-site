import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { SmsChannel } from "./sms/sms-channel";
import { MailChannel } from "./mail/mail-channel";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [
    //
  ],
  providers: [
    NotificationService,
    SmsChannel,
    MailChannel,
  ],
  exports: [
    NotificationService,
  ],
})
export class NotificationModule {
  //
}
