'use client';

import { XMarkIcon } from "@heroicons/react/24/outline";

type SettingsProps = {
  onClickClose: () => void;
};

export default function Settings(props: SettingsProps) {
  return <div 
    className="absolute grid h-screen w-screen"
    style={{
      gridTemplateRows: '1fr 3fr 1fr',
      gridTemplateColumns: '1fr 3fr 1fr',
    }}
    >
    <div className="flex flex-col col-start-2 row-start-2 bg-gray-950 border border-gray-700 rounded-lg">
      <div className="flex p-2">
        <h2 className="text-lg grow">Settings</h2>
        <span 
          className="w-7 h-7 cursor-pointer"
          onClick={(event) => {
            props.onClickClose();
            event.stopPropagation();
          }}
          >
          <XMarkIcon />
        </span>
      </div>
      <div className="grow p-2">body</div>
      <div className="p-2">footer</div>
    </div>
  </div>;
}
