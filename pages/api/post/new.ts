import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let session = await getServerSession(req, res, authOptions);
  if (session) {
    req.body.author = session?.user?.email;
  }

  if (req.method === 'POST') {
    if (req.body.title === '') {
      return res.status(400).json('제목은 빈칸일 수 없습니다.');
    }
    try {
      const db = (await connectDB).db('board');
      await db.collection('post').insertOne(req.body);
      return res.status(200).redirect('/list');
    } catch {
      return res.status(400).json('데이터베이스 에러발생');
    }
  }
};
export default handler;
