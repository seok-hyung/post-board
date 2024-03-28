'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function DetailLink() {
  let router = useRouter();
  return (
    <button
      onClick={() => {
        router.push('/');
      }}
    >
      버튼
    </button>
  );
}
