'use client';
import { useWindowSize } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import React, { RefObject, useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
// import sounds from "../../assets/sounds.mp3";
import { Howl } from "howler";

// The size of the circle at the start of the game
const INITIAL_DIAMETER = 0.4;

type ClickClackProps = {
  // 1 - 10
  level: number;
  // Shoul show confetti
  confetti: boolean;
  onProgress: (level: number) => void;
}

type ContainerDim = {
  w: number;
  h: number;
}

type Circle = {
  x: number;
  y: number;
  d: number;
}

const useContainerDimensions = (ref: RefObject<HTMLDivElement>): ContainerDim => {
  const defaultContainerDim: ContainerDim = {
    w: 0, 
    h:0
  };
  const [dim, setDim] = useState<ContainerDim>(defaultContainerDim);
  useEffect(() => {
    const getDim = () => ({
      w: ref.current?.offsetWidth ?? defaultContainerDim.w,
      h: ref.current?.offsetHeight ?? defaultContainerDim.h
    });
    const handleResize = () => {
      setDim(getDim());
    };
    if (ref.current) {
      setDim(getDim());
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);
  return dim;
};

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(min, val), max);
}

function circleFromLevel(containerDim: ContainerDim, level: number): Circle {
  const minDim = Math.min(containerDim.w, containerDim.h);
  const d = clamp(INITIAL_DIAMETER * (minDim / level), 10, minDim);
  const x = Math.random() * (containerDim.w - d);
  const y = Math.random() * (containerDim.h - d);
  return {
    x,
    y,
    d
  };
}

export default function ClickClack(props: ClickClackProps) {
  const [lastConfetti, setLastConfetti] = useState(1);
  const containerRef = useRef(null);
  const containerDim = useContainerDimensions(containerRef);
  const size = useWindowSize();
  const width = size.width ?? 1;
  const height = size.height ?? 1;
  const circle = circleFromLevel(containerDim, props.level);
  console.log(props.level, circle);
  return <div ref={containerRef} className="playground w-full h-full p-5 static">
    <motion.div 
      className="bg-white rounded-full opacity-0 absolute text-gray-200 text-center line-clamp-1 hover:cursor-pointer"
      style={{
        height: `${circle.d}px`, 
        width: `${circle.d}px`,
        lineHeight: `${circle.d}px` // to center text vertically
      }}
      animate={{
        top:`${circle.y}px`,
        left:`${circle.x}px`,
        opacity: 0.8 
      }}
      whileHover={{
        opacity: 1,
        scale: 1.2,
        transition: {
          duration: 0.2
        }
      }}
      onClick={() => {
        const howl = new Howl({
          src: "/sounds.mp3", 
          sprite: {
            'pop': [795, 873],
            'horse': [2214, 2271],
            'ts': [3354, 3408],
          }
        });
        howl.play('pop');
        const newScore = props.level + 1;
        props.onProgress(newScore);
      }}
      >{ props.level < 4 && <>Click Me!</> }</motion.div>
    { props.confetti && (
      <Confetti
        width={width}
        height={height}
        recycle={false}
        gravity={0.5}
        />
    )}
  </div>;
}

