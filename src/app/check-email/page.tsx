export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We've sent a confirmation link to your inbox. Please click the link to verify your account.
          </p>
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Once confirmed, you'll be redirected back to the home page automatically.
          </p>
        </div>
        <div className="mt-8">
          <a
            href="/login"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  )
}
