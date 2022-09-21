import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const ApplicationConfig = {
  serverPort: parseInt(process.env.SERVER_PORT ?? '8080'),
  baseUrl: '/api/v1',
  loggerDirectory: process.env.LOG_DIR ?? './logs',

  auth: {
    authHeader: 'x-access-token',
    tokenSecretKey: process.env.TOKEN_SECRET_KEY ?? 'secret',
    accessTokenExpired: parseInt(process.env.ACCESS_TOKEN_EXPIRED_IN_SECOND ?? '3600'), // 1h
    refreshTokenExpired: parseInt(process.env.REFRESH_TOKEN_EXPIRED_IN_SECOND ?? '604800'), // 7d
  },

  mail: {
    activation: process.env.MAIL_ACTIVATION?.toLowerCase() === 'true',
    from: process.env.MAIL_FROM,
  },
  aws: {
    region: process.env.AWS_REGION,
  },
};
