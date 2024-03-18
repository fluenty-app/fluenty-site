import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    protected configService: ConfigService,
  ) {
    //
  }

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    response.status(exception.getStatus());

    if (this.wantsHtml(request)) {
      return response.redirect(this.redirectUrl(request));
    }

    return response.json({
      statusCode: exception.getStatus(),
      message: 'Unauthorized',
    });
  }

  wantsHtml(request: Request) {
    return request.header('Accept').includes('text/html');
  }

  redirectUrl(request: Request) {
    const nextUrl = this.configService.get<string>('app.url') + request.url;

    return this.configService.get<string>('app.lastsecondUrl')
      + '/auth/login?nextUrl='
      + encodeURIComponent(nextUrl);
  }
}
