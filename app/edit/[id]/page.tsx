import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

const Edit = async (props: any) => {
  const db = (await connectDB).db('board');
  let result: any = await db
    .collection('post')
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="p-20">
      <h4>수정페이지</h4>
      <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={result.title} />
        <input name="content" defaultValue={result.content} />
        <input
          style={{ display: 'none' }}
          type="text"
          name="_id"
          defaultValue={result._id}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default Edit;
