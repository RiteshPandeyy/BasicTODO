import { useEffect } from "react";
import { createPortal } from "react-dom";
import TitleAndDescription from "./TitleAndDescription";

export default function Modal({
  handleTaskSubmit,
  inputs,
  setInputs,
  isOpen,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="
          relative w-full max-w-lg 
          rounded-3xl border border-slate-200 
          bg-white/95 shadow-2xl
          ring-1 ring-black/5
          p-6 md:p-8
          max-h-[85vh] overflow-y-auto
        "
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="
            absolute top-3 right-3
            inline-flex items-center justify-center
            h-9 w-9 rounded-full
            text-slate-500 hover:text-slate-700
            hover:bg-slate-100 active:bg-slate-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
            transition
          "
        >
          Close
        </button>
        <TitleAndDescription
          handleTaskSubmit={handleTaskSubmit}
          inputs={inputs}
          setInputs={setInputs}
        />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
