'use client';

import { useState, ChangeEvent, useEffect } from 'react';
type CommentProps = {
  _id: string;
  author: string;
};
type DataProps = {
  author: string;
  content: string;
  parent: string;
  _id: string;
};
const Comment = ({ _id, author }: CommentProps) => {
  const [comment, setComment] = useState('');
  const [datas, setDatas] = useState([]);

  // 아래 html 보여준 후, 그 이후 실행됨
  useEffect(() => {
    fetch(`/api/comment/list?id=${_id}`)
      .then((r) => r.json())
      .then((result) => {
        setDatas(result);
      });
  }, [datas]);

  return (
    <>
      <hr />
      <div>댓글목록</div>
      {datas.length > 0
        ? datas.map((data: DataProps, index) => {
            return <p key={index}>{data.content}</p>;
          })
        : '로딩중'}
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch('/api/comment/new', {
            method: 'POST',
            body: JSON.stringify({ comment, _id, author }),
          });
        }}
      >
        댓글 전송
      </button>
    </>
  );
};

export default Comment;
