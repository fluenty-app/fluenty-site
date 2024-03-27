import { Notification } from "./notification";
import { Channel } from "./channel";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { NotifierServiceConfig } from "../../config/services.config";
import { Inject, Logger } from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";
import { AxiosError } from "axios";

export abstract class HttpChannel implements Channel {
  private readonly logger = new Logger(HttpChannel.name);

  constructor(
    @Inject(HttpService) protected httpService: HttpService,
    @Inject(ConfigService) protected configService: ConfigService,
  ) {
    //
  }

  async send(notifiable: any, notification: Notification) {
    const config: NotifierServiceConfig = this.configService.get('services.notifier');

    // return this.httpService
    //   .post(
    //     this.getEndpoint(notifiable, notification),
    //     {
    //       apiKey: config.apiKey,
    //       ...this.getPayload(notifiable, notification),
    //     }
    //   )
    //   .pipe(
    //     catchError((error: AxiosError) => {
    //       this.logger.error("Sending http notification failed.", error.response, this.getEndpoint(notifiable, notification));
    //
    //       return new Observable();
    //     }),
    //   )
    //   .subscribe((data) => data);
  }

  abstract getEndpoint(notifiable: any, notification: Notification): string;

  abstract getPayload(notifiable: any, notification: Notification): Record<any, any>;
}
