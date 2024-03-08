export default {
  origin: [
    new RegExp(process.env.CORS_ALLOWED_ORIGIN),
  ],

  maxAge: parseInt(process.env.CORS_MAX_AGE) || 0,
};
