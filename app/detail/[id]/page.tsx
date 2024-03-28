import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

interface DetailProps {
  params: {
    id: string;
  };
}

const Detail = async (props: DetailProps) => {
  const db = (await connectDB).db('board');
  let result: any = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id) });
  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  );
};
export default Detail;
