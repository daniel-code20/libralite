import 'dotenv/config';
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

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
        bucketName: process.env.S3_BUCKET_NAME || 'libralite',
        region: process.env.S3_REGION || 'us-east-2',
        accessKeyId: process.env.S3_ACCESS_KEY_ID || 'S3_ACCESS_KEY_ID',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'S3_SECRET_ACCESS_KEY',
        signed: { expiry: 5000 },
      },
    },
  })
);
