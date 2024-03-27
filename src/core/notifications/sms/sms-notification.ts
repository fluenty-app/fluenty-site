import { Notification } from "../notification";
import { SmsMessage } from "./sms-message";

export interface SmsNotification extends Notification {
  toSms(notifiable: any, notification: Notification): SmsMessage;
}
