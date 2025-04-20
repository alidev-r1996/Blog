"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-black/30 shadow-2xl rounded-2xl p-8 max-w-md text-center space-y-4 border border-red-200 dark:border-white/10">
        <div className="text-6xl">🚨</div>
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Something went wrong!
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          An unexpected error has occurred. Please try again later or click
          below to reload the page.
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all active:scale-95"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
