import { connectDB } from '@/util/database';

const handler = async (req: any, res: any) => {
  const db = (await connectDB).db('board');
  let result = await db.collection('post').find().toArray();
  return res.status(200).json(result);
};

export default handler;
