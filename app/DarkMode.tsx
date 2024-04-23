'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DarkMode = () => {
  const router = useRouter();
  const [mode, setMode] = useState('');
  useEffect(() => {
    let cookie = `; ${document.cookie}`.split(`; mode=`).pop().split(';')[0];
    setMode(cookie);
    if (cookie === '') {
      document.cookie = 'mode=light; max-age=' + 3600 * 24 * 400;
    }
  }, []);
  return (
    <span
      onClick={() => {
        console.log(mode);
        if (mode === 'light') {
          document.cookie = 'mode=dark; max-age=' + 3600 * 24 * 400;
          setMode('dark');
          router.refresh();
        } else {
          document.cookie = 'mode=light; max-age=' + 3600 * 24 * 400;
          setMode('light');
          router.refresh();
        }
      }}
    >
      {mode === 'light' ? '🌙' : '☀️'}
    </span>
  );
};

export default DarkMode;
