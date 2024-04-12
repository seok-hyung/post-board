import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    let session = await getServerSession(req, res, authOptions);

    const db = (await connectDB).db('board');
    let selectedOne = await db
      .collection('post')
      .findOne({ _id: new ObjectId(req.body.postId) });
    if (!selectedOne) {
      return res.status(404).json({ message: '해당하는 글을 찾을 수 없습니다.' });
    }
    if (!session || !session.user || !session.user.email) {
      return res.status(401).json({ message: '인증 정보가 유효하지 않습니다.' });
    }
    if (selectedOne.author === session?.user.email) {
      await db.collection('post').deleteOne({ _id: new ObjectId(req.body.postId) });
      res.status(200).json({ message: '글 삭제 완료' });
    } else {
      return res.status(500).json('현재유저와 작성자 불일치');
    }
  } else {
    // POST 요청이 아닐 경우 에러 처리
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
