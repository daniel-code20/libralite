// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import 'dotenv/config'

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

import dotenv from 'dotenv';

dotenv.config();

const bucketName = process.env.S3_BUCKET_NAME as string;
const region = process.env.S3_REGION as string;
const accessKeyId = process.env.S3_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string;

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'postgresql',
      url: process.env.DATABASE_PUBLIC_URL ||  'DATABASE_URL_TO_REPLACE' 

    },
    lists,
    session,
    server: {
      cors: { origin: '*', credentials: true,  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']},
      port: 3000,
      maxFileSize: 200 * 1024 * 1024,
     
    },
    storage: {
      my_s3_files: {
        kind: 's3',
        type: 'file',
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        signed: { expiry: 3600 },
      },
    },
  })
);
