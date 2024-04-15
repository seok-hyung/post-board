import { connectDB } from '@/util/database';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
interface Credentials {
  email: string;
  password: string;
}
export const authOptions: any = {
  providers: [
    GithubProvider({
      clientId: 'cef3d0f922c7b448f709',
      clientSecret: 'f5e96b8d8470cf1cb0307c64cf69c4050ea947c3',
    }),

    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials, req): Promise<any> {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        let db = (await connectDB).db('forum');
        let user = await db.collection('user_cred').findOne({ email: email });
        if (!user) {
          console.log('해당 이메일은 없음');
          return null;
        }
        const pwcheck = await bcrypt.compare(password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null;
        }
        return user;
      },
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, //30일 (로그인 유지 기간)
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
  },

  secret: '1q2w3e4r',
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
