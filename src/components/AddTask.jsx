import { useState } from "react";

export default function AddTask({ onButtonClick, disabled }) {
  return (
    <div className="mx-auto mt-6 w-full max-w-2xl flex justify-center">
      <button
        type="button"
        onClick={onButtonClick}
        disabled={disabled}
        className="rounded-xl px-6 py-3 text-sm font-medium text-white shadow-md transition
                   bg-slate-900 hover:bg-slate-800 hover:shadow-lg active:shadow-sm
                   disabled:bg-slate-400 disabled:hover:bg-slate-400 disabled:shadow-none"
      >
        Add Task..
      </button>
    </div>
  );
}
