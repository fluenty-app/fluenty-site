import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { NotificationModule } from '../../core/notifications/notification.module';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [
    AuthenticationController,
  ],
  providers: [
    AuthenticationService,
  ],
  exports: [
    AuthenticationService,
  ],
})
export class AuthenticationModule {
  //
}
