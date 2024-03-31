import { connectDB } from '@/util/database';

export default async function Home() {
  const db = (await connectDB).db('board');
  await db.collection('post').find().toArray();
  return <></>;
}
