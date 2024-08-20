'use client';

import { XMarkIcon } from "@heroicons/react/24/outline";

type AboutProps = {
  onClickClose: () => void;
}

export default function About(props: AboutProps) {
  return <div 
    className="absolute grid h-screen w-screen"
    style={{
      gridTemplateRows: '1fr 3fr 1fr',
      gridTemplateColumns: '1fr 3fr 1fr',
    }}
    onClick={(event) => {
      event.stopPropagation();
      props.onClickClose();
    }}
    >
    <div 
      className="flex flex-col col-start-2 row-start-2 bg-gray-950 border border-gray-700 rounded-lg" 
      onClick={(event) => {
        event.stopPropagation();
      }}
      >
      <div className="flex px-6 py-4 bg-gray-900 rounded-t-lg" >
        <h2 className="text-lg grow font-bold">About</h2>
        <span 
          className="w-7 h-7 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            props.onClickClose();
          }}
          >
          <XMarkIcon />
        </span>
      </div>
      <div className="flex flex-col h-3/4 justify-center text-normal leading-relaxed p-10">
        <p className="pb-4">
          This is a game I built for my two small boys to practice with the computer. 
        </p>
        <p className="pb-4">
          The objective is to just click the circle, if you manage to do two consecutive clicks in less than the defined time threshold, you advance to the next level where the circle becomes smaller. The circle always moves randomly after each click and there are 10 levels in total.
        </p>
        <p className="pb-4">
          Alternatively you can press the letter that is written inside the circle on your keyboard.
        </p>
        <p>
          I don&apos;t know anything about anything and I&apos;m told screen time for children should be limited.
        </p>
      </div>
    </div>
  </div>;
}
