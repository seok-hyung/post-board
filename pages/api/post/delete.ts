import { ObjectId } from 'mongodb';
import { connectDB } from '@/util/database';

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const db = (await connectDB).db('board');
    await db.collection('post').deleteOne(req.body);

    // 정상적으로 문서가 업데이트된 후 리디렉션
    res.status(200).json({ message: 'Post successfully deleted' });
    // res.status(300).redirect('/list'); //일반적으로, 리디렉션은 HTTP 응답 코드 3xx를 사용하여 처리됩니다.
    console.log('delete.ts 핸들러 정상 작동');
  } else {
    // POST 요청이 아닐 경우 에러 처리
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
