import { Injectable } from '@nestjs/common';

import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl as cloudFrontGetSignedUrl } from '@aws-sdk/cloudfront-signer';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ApplicationConfig } from '@config/application.config';
import { AppLogger } from '@config/logger/app-logger.config';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly cloudFrontDomain: string;
  private readonly cloudFrontKeyId: string;
  private readonly cloudFrontPrivateKey: string;
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(S3Service.name);
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: ApplicationConfig.aws.accessKeyId,
        secretAccessKey: ApplicationConfig.aws.secretAccessKey,
      },
      region: ApplicationConfig.aws.region,
    });
    this.bucketName = ApplicationConfig.aws.s3.bucketName;
    this.cloudFrontDomain = ApplicationConfig.aws.cloudFront.domain;
    this.cloudFrontKeyId = ApplicationConfig.aws.cloudFront.keyId;
    this.cloudFrontPrivateKey = ApplicationConfig.aws.cloudFront.privateKey;
  }

  async getPreSignUrlToPut(path: string): Promise<string> {
    this.logger.info(`Pre sign url with path #${path}`);

    return getSignedUrl(
      this.s3Client,
      new PutObjectCommand({ Bucket: this.bucketName, Key: path }),
      { expiresIn: ApplicationConfig.aws.s3.preSignUrlExpired },
    );
  }

  async getPreSignUrlToGet(path: string): Promise<string> {
    this.logger.info(`Pre sign url with path #${path}`);

    return getSignedUrl(
      this.s3Client,
      new GetObjectCommand({ Bucket: this.bucketName, Key: path }),
      { expiresIn: ApplicationConfig.aws.s3.preSignUrlExpired },
    );
  }

  async getCloudFrontUrl(path: string): Promise<{ path: string; url: string }> {
    const url = `https://${this.cloudFrontDomain}/${path}`;

    const expired = ApplicationConfig.aws.s3.preSignUrlExpired;
    const dateLessThan = new Date(Date.now() + expired * 1000).toISOString();

    return {
      path,
      url: cloudFrontGetSignedUrl({
        url,
        keyPairId: this.cloudFrontKeyId,
        privateKey: this.cloudFrontPrivateKey,
        dateLessThan,
      }),
    };
  }

  async deleteObject(path: string): Promise<DeleteObjectCommandOutput> {
    this.logger.info(`Delete object with path #${path}`);

    return this.s3Client.send(new DeleteObjectCommand({ Bucket: this.bucketName, Key: path }));
  }
}
