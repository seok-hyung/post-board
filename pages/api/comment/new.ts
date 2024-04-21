import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
type sessionType = {
  user: {
    name: string;
    email: string;
  };
  expires: string;
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const commentReq = JSON.parse(req.body);
  //   console.log(commentReq);
  const session: sessionType | null = await getServerSession(req, res, authOptions);

  if (req.method === 'POST' && session) {
    let commentObj = {
      content: commentReq.comment,
      author: session.user.email,
      parent: new ObjectId(commentReq._id),
    };

    const db = (await connectDB).db('board');
    let result = await db.collection('comment').insertOne(commentObj);
    res.status(200).json('저장완료');
  }
};

export default handler;
