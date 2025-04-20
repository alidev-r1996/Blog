import Link from "next/link";

// app/goodbye/page.tsx
export default function LogoutPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 overflow-hidden relative">
        {/* Floating Icons */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="animate-floating text-blue-400 absolute text-4xl top-10 left-10">👋</div>
          <div className="animate-floating2 text-pink-400 absolute text-3xl bottom-20 right-10">✨</div>
          <div className="animate-floating3 text-yellow-400 absolute text-5xl top-1/2 left-1/2">🎉</div>
        </div>
  
        {/* Card */}
        <div className="z-10 bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center animate-fade-in space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Logged Out</h1>
          <p className="text-gray-600 text-base">
            Thanks for stopping by. We hope to see you again soon!
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }
  