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

const {
  // The S3 Bucket Name used to store assets
  S3_BUCKET_NAME: bucketName = 'keystone-test',
  // The region of the S3 bucket
  S3_REGION: region = 'ap-southeast-2',
  // The Access Key ID and Secret that has read/write access to the S3 bucket
  S3_ACCESS_KEY_ID: accessKeyId = 'keystone',
  S3_SECRET_ACCESS_KEY: secretAccessKey = 'keystone',
  // The base URL to serve assets from
  ASSET_BASE_URL: baseUrl = process.env.BASE_URL,
} = process.env;

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
      cors: { origin: 'https://frabjous-conkies-d49737.netlify.app/', credentials: true,  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']},
      port: 3000,
      maxFileSize: 200 * 1024 * 1024,
     
    },
    storage: {
      my_local_images: {
        // Images that use this store will be stored on the local machine
        kind: 's3',
        // This store is used for the image field type
        type: 'file',
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: (path) => `${baseUrl}/images${path}`,
        // The route that will be created in Keystone's backend to serve the images
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
    },
  })
);
