'use client';
import ClickClack from './components/clickclack'
import Header from './components/header'
import { useState } from 'react';
import Victory from './components/victory';
import About from './about';
import Settings from './components/settings';

type DifficultyMap = {[key: string]: number};
// You have to click faster than this many milliseconds
const DIFICULTY_MAP: DifficultyMap = {
  'easy': 5000,
  'medium': 2000,
  'hard': 1000,
}

export type Difficulty = keyof DifficultyMap;

export default function Home() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [start, setStart] = useState(new Date());
  const [speeds, setSpeeds] = useState<number[]>([]);
  const [showingSettings, setShowingSettings] = useState<boolean>(true);
  const [showingAbout, setShowingAbout] = useState<boolean>(false);
  const onProgress: () => void = () => {
    const now = new Date();
    const speed = now.getTime() - start.getTime();
    setSpeed(speed);
    setSpeeds([...speeds, speed]);
    if (speed < DIFICULTY_MAP[difficulty]) {
      setLevel(level + 1);
      setConfetti(true);
    } else {
      setConfetti(false);
    }
    setStart(new Date());
  };
  return (
    <main className="absolute flex h-screen w-screen flex-col items-center justify-between">
      <Header 
        difficulty={difficulty} 
        level={level} 
        speed={speed} 
        onClickSettings={() => setShowingSettings(true)} 
        onClickAbout={() => setShowingAbout(true)}
        />
      { level < 10 && ( 
        <ClickClack level={level} confetti={confetti} onProgress={onProgress}/>
      )}
      { level === 10 && ( 
        <Victory/>
      )}
      { showingSettings && (
        <Settings 
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onClickClose={() => setShowingSettings(false)} 
          />
      )}
      { showingAbout && (
        <About 
          onClickClose={() => setShowingAbout(false)} 
        />
      )}
    </main>
  )
}
