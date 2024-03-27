import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import AppConfig from './app.config';
import DatabaseConfig from './database.config';
import AuthConfig from './auth.config';
import ServicesConfig from './services.config';


@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [
        AppConfig,
        AuthConfig,
        DatabaseConfig,
        ServicesConfig,
      ],
      cache: true,
    }),
  ],
  controllers: [],
  providers: [],
})

export class ConfigModule {
  //
}
