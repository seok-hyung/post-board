import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

const handler = async (req: any, res: any) => {
  if (req.method === 'DELETE') {
    const db = (await connectDB).db('board');
    await db.collection('post').deleteOne({ _id: new ObjectId(req.body.postId) });
    res.status(200).json({ message: 'Post successfully deleted' });
  } else {
    // POST 요청이 아닐 경우 에러 처리
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
