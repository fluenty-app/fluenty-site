import { Notification } from "../notification";
import { Injectable } from "@nestjs/common";
import { HttpChannel } from "../http-channel";
import { SmsNotification } from "./sms-notification";

@Injectable()
export class SmsChannel extends HttpChannel {
  getEndpoint(notifiable: any, notification: Notification): string {
    return this.configService.get('services.notifier.endpoint') + '/api/sms/send';
  }

  getPayload(notifiable: any, notification: Notification): Record<any, any> {
    return (<SmsNotification>notification)
      .toSms(notifiable, notification)
      .payload();
  }
}
