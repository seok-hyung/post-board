'use client';
import React, { useEffect, useState } from 'react';
import { connectDB } from '@/util/database';

const List = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = (await connectDB).db('board');
      const result = await db.collection('post').find().toArray();
      // MongoDB 문서를 Post 타입으로 변환
      const postsData: Post[] = result.map((doc) => ({
        _id: doc._id,
        title: doc.title,
        content: doc.content,
      }));
      setPosts(postsData);
    };
    fetchData();
  }, []); // 빈 의존성 배열을 추가하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함
  return (
    <>
      {posts.map((data, index) => (
        <div key={index} className="list-bg">
          <div className="list-item">
            <h4>{data.title}</h4>
            <p>{data.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default List;

interface Post {
  title: string;
  content: string;
}
