'use client';

import { useState, ChangeEvent } from 'react';
type CommentProps = {
  _id: string;
  author: string;
};
const Comment = ({ _id, author }: CommentProps) => {
  const [comment, setComment] = useState('');
  return (
    <>
      <div>댓글목록</div>
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
