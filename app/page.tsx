import { connectDB } from '@/util/database';

export default async function Home() {
  const db = (await connectDB).db('board');
  let result = await db.collection('post').find().toArray();
  console.log(result);
  return <></>;
}
