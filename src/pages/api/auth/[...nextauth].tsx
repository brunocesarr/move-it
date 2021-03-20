import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default (
  request: NextApiRequest,
  response: NextApiResponse,
): void | Promise<void> =>
  NextAuth(request, response, {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      // Providers.Google({
      //   clientId: process.env.GOOGLE_CLIENT_ID,
      //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // }),
      // Providers.Facebook({
      //   clientId: process.env.FACEBOOK_CLIENT_ID,
      //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      // }),
    ],
    debug: process.env.NODE_ENV === 'development',
  });
