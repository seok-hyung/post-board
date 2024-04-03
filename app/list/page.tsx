import React from 'react';
import { connectDB } from '@/util/database';
import ListItem from './ListItem';

const List = async () => {
  const db = (await connectDB).db('board');
  let result = await db.collection('post').find().toArray();
  const posts: Post[] = result.map((doc) => ({
    _id: doc._id.toString(), // _id를 문자열로 변환
    title: doc.title,
    content: doc.content,
  }));
  return (
    <div className="list-bg">
      <ListItem result={posts} />
    </div>
  );
};

export default List;
interface Post {
  content: string;
  _id: string;
  title: string;
}
