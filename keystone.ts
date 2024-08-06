import 'dotenv/config';
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

const baseUrl = 'https://libralite-production.up.railway.app/';

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
        type: 'image',
        bucketName: process.env.S3_BUCKET_NAME || 'S3_BUCKET_NAME',
        region: process.env.S3_REGION || 'S3_REGION',
        accessKeyId: process.env.S3_ACCESS_KEY_ID || 'S3_ACCESS_KEY_ID',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'S3_SECRET_ACCESS_KEY',
        signed: { expiry: 3600 },
        generateUrl: path => `${baseUrl}/${path}`,
      },
    },
  })
);
