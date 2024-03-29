import { connectDB } from '@/util/database';

const handler = async (req: any, res: any) => {
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
