'use client';

type AboutProps = {
}

export default function About(props: AboutProps) {
  return <div className="w-full h-full flex flex-col justify-center shrink-0">
    <div className="text-center text-9xl mb-5">
      <p>This is a game I built for my two small boys to practice with the computer. The objective is to just click the circle, if you manage to do two consecutive clicks in less than the defined time threshold, you advance to the next level where the circle becomes smaller. The circle always moves randomly after each click and there are 10 levels in total.
      </p>
      <p>I don&apos;t know anything about anything and I&apos;m told screen time for children should be limited.
      </p>
    </div>
  </div>;
}
