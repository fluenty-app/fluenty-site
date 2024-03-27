import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  cookie: {
    name: 'auth_token',

    domain: process.env.AUTH_DOMAIN || 'localhost',
  },

  // Personal access token lifetime in minutes
  tokenLifetime: null,
}));
