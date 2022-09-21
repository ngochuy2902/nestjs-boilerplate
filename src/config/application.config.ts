import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const ApplicationConfig = {
  serverPort: parseInt(process.env.SERVER_PORT) ?? 8080,
  baseUrl: '/api/v1',
  loggerDirectory: process.env.LOG_DIR,

  auth: {
    tokenSecretKey: process.env.TOKEN_SECRET_KEY,
    accessTokenExpired: parseInt(process.env.ACCESS_TOKEN_EXPIRED_IN_SECOND) ?? 3600, // 1h
    refreshTokenExpired: parseInt(process.env.REFRESH_TOKEN_EXPIRED_IN_SECOND) ?? 604800, // 7d
  },

  mail: {
    activation: Boolean(process.env.MAIL_ACTIVATION),
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM,
  },
};
