import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Comment from './Comment';

type DetailProps = {
  params: {
    id: string;
  };
};

interface Post {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
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
      <Comment _id={result._id.toString()} author={result.author} />
    </div>
  );
};
export default Detail;
