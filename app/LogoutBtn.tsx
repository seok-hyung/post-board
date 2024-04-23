'use client';
import { signOut } from 'next-auth/react';

const LogoutBtn = () => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      로그아웃
    </button>
  );
};
export default LogoutBtn;

// 로그아웃 후 특정 페이지로 리디렉션하고 싶다면 signOut 함수에 옵션을 전달할 수 있습니다.
// signOut({ callbackUrl: '/logged-out' });
