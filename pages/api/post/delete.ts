import { ObjectId } from 'mongodb';
import { connectDB } from '@/util/database';

const handler = async (req: any, res: any) => {
  if (req.method === 'DELETE') {
    const db = (await connectDB).db('board');
    await db.collection('post').deleteOne({ _id: new ObjectId(req.body) });

    // 정상적으로 문서가 업데이트된 후 리디렉션
    res.status(200).redirect('/list');
  } else {
    // POST 요청이 아닐 경우 에러 처리
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
