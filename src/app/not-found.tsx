'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-6 text-center">
      <div className="fade-in-up">
        <h1 className="text-8xl font-extrabold text-purple-700 drop-shadow mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or might have been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-2xl bg-purple-600 text-white text-lg font-medium hover:bg-purple-700 transition"
        >
          Go Home
        </Link>
      </div>

      <div className="mt-12">
        <div className="w-60 h-60 relative bounce-slow">
          <div className="absolute inset-0 rounded-full bg-pink-200 blur-2xl opacity-40"></div>
          <svg
            className="relative w-full h-full"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="256" cy="256" r="200" fill="#fcdde8" />
            <path
              d="M160 208h192M160 304h192M200 240v-48M312 240v-48"
              stroke="#a855f7"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="220" cy="344" r="16" fill="#a855f7" />
            <circle cx="292" cy="344" r="16" fill="#a855f7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
