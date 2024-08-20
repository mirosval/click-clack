'use client';

import { useWindowSize } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import Confetti from 'react-confetti';
// import sounds from "../../assets/sounds.mp3";
import { Howl } from "howler";
import dynamic from "next/dynamic";

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
  const defaultContainerDim: ContainerDim = useMemo(() => {
    return {
      w: 0, 
      h: 0
    };
  }, []);
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
  }, [defaultContainerDim, ref]);
  return dim;
};

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(min, val), max);
}

function circleFromLevel(containerDim: ContainerDim, level: number): Circle {
  const minDim = Math.min(containerDim.w, containerDim.h);
  const d = clamp(INITIAL_DIAMETER * (minDim / level), 10, minDim);
  // the random x/y should be within a rectangle that is at least 1 diameter of the circle smaller than the screen
  const x = d + Math.random() * (containerDim.w - (2 * d));
  const y = d + Math.random() * (containerDim.h - (2 * d));
  return {
    x,
    y,
    d
  };
}

function randomLetter(): string {
  const charCode = 65 + Math.round(Math.random() * 25);
  return String.fromCharCode(charCode);
}

function ClickClack(props: ClickClackProps) {
  const containerRef = useRef(null);
  const containerDim = useContainerDimensions(containerRef);
  const size = useWindowSize();
  const width = size.width ?? 1;
  const height = size.height ?? 1;
  const circle = circleFromLevel(containerDim, props.level);
  const letter = randomLetter();
  //console.log(props.level, circle);
  return <div 
    ref={containerRef} 
    className="playground w-full h-full p-5 static"
    onKeyDown={(e) => {
      if (e.key.toLowerCase() === letter.toLowerCase()) {
        props.onProgress(props.level + 1);
      }
    }}
    tabIndex={0}
    >
    <motion.div 
      className="bg-black dark:bg-white border-black dark:border-white rounded-full opacity-0 absolute text-gray-800 dark:text-gray-200 text-center line-clamp-1 hover:cursor-pointer"
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
      >
        { // props.level < 4 && <span className="font-size-lg text-red-600">{letter}</span> 
        }
        <div className="grid place-items-center text-3xl h-full w-full font-bold text-red-500">{letter}</div>
      </motion.div>
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

export default dynamic(() => Promise.resolve(ClickClack), { ssr: false});
