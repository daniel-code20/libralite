import 'dotenv/config';
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

const S3_BUCKET_NAME=process.env.S3_BUCKET_NAME || 'S3_BUCKET_NAME_TO_REPLACE'
const S3_REGION=process.env.S3_REGION || 'S3_REGION_TO_REPLACE'
const S3_ACCESS_KEY_ID=process.env.S3_ACCESS_KEY_ID || 'S3_ACCESS_KEY_ID_TO_REPLACE'
const S3_SECRET_ACCESS_KEY=process.env.S3_SECRET_ACCESS_KEY|| 'S3_SECRET_ACCESS_KEY_TO_REPLACE'

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
        kind: 's3',
        type: 'file',
        bucketName: S3_BUCKET_NAME,
        region: S3_REGION,
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
      },
    },
  })
);
