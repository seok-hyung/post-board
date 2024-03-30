import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    // req.body가 null이거나 undefined일 경우를 검사
    if (!req.body || !req.body.title || !req.body.content || !req.body._id) {
      // 적절한 에러 메시지와 함께 클라이언트에게 응답
      return res.status(400).send('Missing body parameters');
    }

    let newPost = { title: req.body.title, content: req.body.content };
    const db = (await connectDB).db('board');
    let result = await db
      .collection('post')
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: newPost });

    // 정상적으로 문서가 업데이트된 후 리디렉션
    res.status(200).redirect('/list');
  } else {
    // POST 요청이 아닐 경우 에러 처리
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
