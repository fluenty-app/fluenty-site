import { Notification } from "./notification";

export interface Channel {
  send(notifiable: any, notification: Notification);
}
