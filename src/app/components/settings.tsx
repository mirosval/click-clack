'use client';

import { XMarkIcon } from "@heroicons/react/24/outline";
import {Difficulty } from "../page";
import React from "react";

type SettingsProps = {
  difficulty: Difficulty,
  setDifficulty: (difficulty: Difficulty) => void,
  onClickClose: () => void;
};

export default function Settings(props: SettingsProps) {
  const isSelectedDifficulty = (diff: Difficulty) => props.difficulty === diff;
  const selectDifficulty = (diff: Difficulty) => props.setDifficulty(diff);
  const close = (event: React.MouseEvent) => {
      event.stopPropagation();
      props.onClickClose();
  };
  return <div 
    className="absolute grid h-screen w-screen"
    style={{
      gridTemplateRows: '1fr 3fr 1fr',
      gridTemplateColumns: '1fr 3fr 1fr',
    }}
    onClick={close}
    >
    <div 
      className="flex flex-col col-start-2 row-start-2 bg-gray-950 border border-gray-700 rounded-lg"
      onClick={(event) => {
        event.stopPropagation();
      }}
      >
      <div className="flex px-6 py-4 bg-gray-900 rounded-t-lg">
        <h2 className="text-lg grow font-bold">Settings</h2>
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
      <div className="grow p-6">
        <div className="flex">
          <h3 className="grow">Difficulty</h3>
          <GroupButtonGroup>
            <GroupButton 
              selected={isSelectedDifficulty('easy')}
              select={() => selectDifficulty('easy')}
              >Easy
            </GroupButton>
            <GroupButton 
              selected={isSelectedDifficulty('medium')}
              select={() => selectDifficulty('medium')}
              >Medium
            </GroupButton>
            <GroupButton 
              selected={isSelectedDifficulty('hard')}
              select={() => selectDifficulty('hard')}
              >Hard
            </GroupButton>
          </GroupButtonGroup>
        </div>
      </div>
      <div className="p-6 flex">
        <div className="grow"></div>
        <button 
          type="button" 
          className={"px-4 py-2.5 text-center text-sm font-medium text-secondary-700 bg-green-400 rounded-lg"}
          onClick={props.onClickClose}
          >
          Save
        </button>
      </div>
    </div>
  </div>;
}


type GroupButtonGroupProps = {
  children: React.ReactNode,
};

function GroupButtonGroup(props: GroupButtonGroupProps) {
  return (
    <div className="space-x-5">
      <div className="inline-flex -space-x-0 divide-x divide-gray-600 overflow-hidden rounded-lg border border-gray-600 shadow-sm">
        {props.children}
      </div>
    </div>
  )
};

type GroupButtonProps = {
  children: React.ReactNode,
  select: () => void,
  selected: boolean,
};

function GroupButton(props: GroupButtonProps) {
  const selected = props.selected ? "bg-blue-400 hover:bg-blue-500" : "bg-gray-800 hover:bg-blue-500";
return (
    <button 
      type="button" 
      className={"px-4 py-2.5 text-center text-sm font-medium text-secondary-700 " + selected}
      onClick={props.select}
      >
      {props.children}
    </button>
)
}
