'use client'

import { useUser } from "@/hooks/useUser";
import { logout } from "@/app/auth/actions";

export default function Home() {
  const { user, loading } = useUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center max-w-2xl w-full bg-white p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Welcome to the Blog
        </h1>

        {loading ? (
          <p className="text-gray-500 animate-pulse">Checking session...</p>
        ) : user ? (
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <p className="text-lg text-gray-600">
                Logged in as <span className="font-semibold text-gray-900">{user.email}</span>
              </p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="/profile"
                className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go to Profile
              </a>
              <button
                onClick={() => logout()}
                className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <p className="text-lg text-gray-600 text-center">
              Sign in to start creating and interacting with posts.
            </p>
            <div className="flex gap-4">
              <a 
                href="/login"
                className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </a>
              <a 
                href="/signup"
                className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Create account
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
