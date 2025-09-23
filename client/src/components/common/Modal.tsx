"use client";

import { ReactNode } from "react";

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-center w-full">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border text-lg text-gray-600 hover:text-black hover:border-black"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
