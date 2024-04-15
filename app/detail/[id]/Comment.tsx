'use client';

import { useState, ChangeEvent } from 'react';

const Comment = () => {
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
          console.log(comment);
          //   fetch('/url', { method: 'POST', body: comment });
        }}
      >
        댓글 전송
      </button>
    </>
  );
};

export default Comment;
