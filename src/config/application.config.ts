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
    from: process.env.MAIL_FROM || 'noreply@localhost',
  },

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION || 'ap-northeast-1',
    s3: {
      bucketName: process.env.AWS_S3_BUCKET,
      preSignUrlExpired: parseInt(process.env.AWS_S3_PRE_SIGN_URL_EXPIRED_IN_SECOND) ?? 300, // 5m
    },
    cloudFront: {
      keyId: process.env.AWS_CLOUDFRONT_KEY_PAIR_ID,
      privateKey: process.env.AWS_CLOUDFRONT_PRIVATE_KEY,
      domain: process.env.AWS_CLOUDFRONT_DOMAIN,
    },
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
  },
};
