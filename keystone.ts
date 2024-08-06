import 'dotenv/config';
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

const S3_BUCKET_NAME=process.env.S3_BUCKET_NAME || 'S3_BUCKET_NAME'
const S3_REGION=process.env.S3_REGION || 'S3_REGION'
const S3_ACCESS_KEY_ID=process.env.S3_ACCESS_KEY_ID || 'S3_ACCESS_KEY_ID'
const S3_SECRET_ACCESS_KEY=process.env.S3_SECRET_ACCESS_KEY|| 'S3_SECRET_ACCESS_KEY'

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
        bucketName: S3_BUCKET_NAME,
        // The S3 bucket region pulled from the S3_REGION environment variable above
        region: S3_REGION,
        // The S3 Access Key ID pulled from the S3_ACCESS_KEY_ID environment variable above
        accessKeyId: S3_ACCESS_KEY_ID,
        // The S3 Secret pulled from the S3_SECRET_ACCESS_KEY environment variable above
        secretAccessKey: S3_SECRET_ACCESS_KEY,
      },
    },
  })
);
