import React, { useEffect, useState } from 'react';

export default function Timer({ initialSeconds = 1800, onExpire }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const saved = sessionStorage.getItem('exam_time_left');
    if (saved) setSeconds(Number(saved));
  }, []);

  useEffect(() => {
    sessionStorage.setItem('exam_time_left', seconds.toString());
    if (seconds <= 0) {
      onExpire && onExpire();
      return;
    }
    const t = setInterval(() => setSeconds(prev => prev - 1), 1000);
    return () => clearInterval(t);
  }, [seconds, onExpire]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="timer badge bg-danger p-2">
      <strong>{mm}:{ss}</strong>
    </div>
  );
}
