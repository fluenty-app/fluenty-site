import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import CorsConfig from './config/cors.config';
import { ResponseInterceptor } from './core/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: CorsConfig,
  });

  app.useGlobalInterceptors(new ResponseInterceptor());

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get('app.port', 3000));
}

bootstrap();
