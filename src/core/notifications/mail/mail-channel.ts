import { Notification } from "../notification";
import { Injectable } from "@nestjs/common";
import { HttpChannel } from "../http-channel";
import { MailNotification } from "./mail-notification";

@Injectable()
export class MailChannel extends HttpChannel {
  getEndpoint(notifiable: any, notification: Notification): string {
    return this.configService.get('services.notifier.endpoint') + '/api/email/send';
  }

  getPayload(notifiable: any, notification: Notification): Record<any, any> {
    return (<MailNotification>notification)
      .toMail(notifiable, notification)
      .payload();
  }
}
