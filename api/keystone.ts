import { config } from '@keystone-6/core';
import { lists } from '../schema'; // Ajusta la ruta según tu estructura de proyecto
import { withAuth, session } from '../auth'; // Ajusta la ruta según tu estructura de proyecto
import { ServerConfig } from '@keystone-6/core/types';
import { BaseKeystoneTypeInfo } from '@keystone-6/core/types';
import dotenv from 'dotenv';

dotenv.config();

const {
  S3_BUCKET_NAME: bucketName = 'keystone-test',
  S3_REGION: region = 'ap-southeast-2',
  S3_ACCESS_KEY_ID: accessKeyId = 'keystone',
  S3_SECRET_ACCESS_KEY: secretAccessKey = 'keystone',
  ASSET_BASE_URL: baseUrl = 'http://localhost:3000',
} = process.env;

const keystoneConfig = withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    session,
    server: {
      cors: { origin: '*', credentials: true, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] },
      port: 3000,
      maxFileSize: 200 * 1024 * 1024,
    } as ServerConfig<BaseKeystoneTypeInfo>,
    storage: {
      my_local_images: {
        kind: 'local',
        type: 'image',
        generateUrl: (path) => `${baseUrl}/images${path}`,
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      },
    },
  })
);

export default keystoneConfig;
