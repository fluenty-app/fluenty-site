import CorsConfig from './config/cors.config';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './core/response/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from './core/validation/validation.pipe';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: CorsConfig,
  });

  app.use(cookieParser());

  app.useGlobalGuards(new (AuthGuard(['cookie', 'jwt'])));

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422,
    transform: true,
    stopAtFirstError: true,
  }));

  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get('app.port', 3000));
}

bootstrap();
