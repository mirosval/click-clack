'use client';
import Image from 'next/image'
import ClickClack from './components/clickclack'
import Header from './components/header'
import { useState } from 'react';
import Victory from './components/victory';

// You have to click faster than this many milliseconds
const LEVEL_UP_SPEED_THRESHOLD = 1000;

export default function Home() {
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [start, setStart] = useState(new Date());
  const [speeds, setSpeeds] = useState<number[]>([]);
  const onProgress: () => void = () => {
    const now = new Date();
    const speed = now.getTime() - start.getTime();
    setSpeed(speed);
    setSpeeds([...speeds, speed]);
    if (speed < LEVEL_UP_SPEED_THRESHOLD) {
      setLevel(level + 1);
      setConfetti(true);
    } else {
      setConfetti(false);
    }
    setStart(new Date());
  };
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <Header level={level} speed={speed} />
      { level < 10 && ( 
        <ClickClack level={level} confetti={confetti} onProgress={onProgress}/>
      )}
      { level === 10 && ( 
        <Victory/>
      )}
    </main>
  )
}
