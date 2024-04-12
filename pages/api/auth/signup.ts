import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    let hash = await bcrypt.hash(req.body.password, 10);
    console.log(hash);
    console.log(req.body);
    let db = (await connectDB).db('board');
    await db.collection('user_cred').insertOne(req.body);
  }
};
export default handler;
