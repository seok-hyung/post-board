import { connectDB } from '@/util/database';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'cef3d0f922c7b448f709',
      clientSecret: 'f5e96b8d8470cf1cb0307c64cf69c4050ea947c3',
    }),
  ],
  secret: '1q2w3e4r',
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
