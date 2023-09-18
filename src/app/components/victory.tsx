'use client';

type VictoryProps = {
}

export default function Victory(props: VictoryProps) {
  return <div className="w-full h-full flex flex-col justify-center shrink-0">
    <h1 className="text-center text-5xl mb-10 font-black">Victory!</h1>
    <div className="text-center text-9xl mb-5">
      &#x1F389;
    </div>
    <div className="text-center text-1xl text-gray-500">
      Reload page to reset
    </div>
  </div>;
}
