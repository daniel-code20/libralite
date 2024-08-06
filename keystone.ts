import 'dotenv/config';
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

const {
  // The S3 Bucket Name used to store assets
  S3_BUCKET_NAME: bucketName = 'keystone-test',
  // The region of the S3 bucket
  S3_REGION: region = 'ap-southeast-2',
  // The Access Key ID and Secret that has read/write access to the S3 bucket
  S3_ACCESS_KEY_ID: accessKeyId = 'keystone',
  S3_SECRET_ACCESS_KEY: secretAccessKey = 'keystone',
  // The base URL to serve assets from
  ASSET_BASE_URL: baseUrl = 'http://localhost:3000',
} = process.env;

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_PUBLIC_URL || 'DATABASE_URL_TO_REPLACE',
    },
    lists,
    session,
    server: {
      cors: { origin: '*', credentials: true, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] },
      port: 3000,
      maxFileSize: 200 * 1024 * 1024,
    },
    storage: {
      my_s3_files: {
        // Files that use this store will be stored in an s3 bucket
        kind: 's3',
        // This store is used for the file field type
        type: 'file',
        // The S3 bucket name pulled from the S3_BUCKET_NAME environment variable above
        bucketName,
        // The S3 bucket region pulled from the S3_REGION environment variable above
        region,
        // The S3 Access Key ID pulled from the S3_ACCESS_KEY_ID environment variable above
        accessKeyId,
        // The S3 Secret pulled from the S3_SECRET_ACCESS_KEY environment variable above
        secretAccessKey,
        // The S3 links will be signed so they remain private
        signed: { expiry: 5000 },
      },
    },
  })
);
