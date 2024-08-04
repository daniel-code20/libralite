import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';
import { KeystoneContext, SessionStrategy } from '@keystone-6/core/types';

import dotenv from 'dotenv';
dotenv.config();

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('The SESSION_SECRET environment variable must be set in production');
  } else {
    sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
  }
}

const sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const session: SessionStrategy<any> = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add initial roles here
  },
  sessionData: 'id name email',
});

export { withAuth, session };
