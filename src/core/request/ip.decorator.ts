import { getClientIp } from '@supercharge/request-ip';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const IP_V4 = /(?:[0-9]{1,3}.){3}[0-9]{1,3}$/;

export const getIp = (request) => {
  const ip = getClientIp(request);

  const matches = ip.match(IP_V4);

  return matches ? matches[0] : ip;
};

export const Ip = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return getIp(
      ctx.switchToHttp().getRequest(),
    );
  },
);
