import React, { useState, useRef, useEffect } from "react";

export default function SmoothToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<any>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef?.current?.scrollHeight : 0);
    }
  }, [isOpen]);

  console.log("height", height)

  return (
    <div className="max-w-md mx-auto mt-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        <span>Toggle Content</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        ref={contentRef}
        className="transition-all duration-500 overflow-hidden"
        style={{ maxHeight: height }}
      >
        <div className="p-4 bg-gray-100 rounded-b-md">
          This content smoothly expands and collapses when toggled. This content smoothly expands and collapses when toggled.This content smoothly expands and collapses when toggled.This content smoothly expands and collapses when toggled.
        </div>
      </div>
    </div>
  );
}
