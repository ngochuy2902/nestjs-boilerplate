import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const applicationConfig = {
  serverPort: parseInt(process.env.SERVER_PORT) ?? 8080,
  baseUrl: '/api/v1',
  tokenSecretKey: process.env.TOKEN_SECRET_KEY,
  accessTokenExpired: parseInt(process.env.ACCESS_TOKEN_EXPIRED_IN_SECOND) ?? 3600, // 1h
  refreshTokenExpired: parseInt(process.env.REFRESH_TOKEN_EXPIRED_IN_SECOND) ?? 604800, // 7d
  loggerDirectory: process.env.LOG_DIR,
};
