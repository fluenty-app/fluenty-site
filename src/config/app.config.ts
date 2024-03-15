import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  key: process.env.APP_KEY,

  port: parseInt(process.env.APP_PORT, 10) || 3000,

  timezone: process.env.APP_TIMEZONE || 'UTC',

  cdnUrl: process.env.CDN_URL,
}));
