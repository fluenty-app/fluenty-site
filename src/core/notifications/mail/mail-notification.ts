import { Notification } from "../notification";
import { MailMessage } from "./mail-message";

export interface MailNotification extends Notification {
  toMail(notifiable: any, notification: Notification): MailMessage;
}
