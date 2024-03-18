import { Injectable } from "@nestjs/common";
import { Notification } from "./notification";
import { ModuleRef } from "@nestjs/core";
import { Channel } from "./channel";

@Injectable()
export class NotificationService {
  constructor(
    protected moduleRef: ModuleRef,
  ) {
    //
  }

  send(notifiable: any, notification: Notification) {
    notification.via(notifiable).forEach((channel) => {
      const channelInstance: Channel = this.moduleRef.get(channel);

      channelInstance.send(notifiable, notification);
    });
  }
}
