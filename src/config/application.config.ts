import * as dotenv from 'dotenv';
import process from 'node:process';

dotenv.config({ path: '.env' });

export const ApplicationConfig = {
  env: process.env.NODE_ENV ?? 'dev',
  serverPort: parseInt(process.env.SERVER_PORT ?? '8080'),
  baseUrl: '/api/v1',
  loggerDirectory: process.env.LOG_DIR ?? './logs',
  logQueryEnabled: process.env.LOG_QUERY_ENABLED === 'true',

  auth: {
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
