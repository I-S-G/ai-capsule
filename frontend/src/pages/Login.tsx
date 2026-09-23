const API_URL = import.meta.env.VITE_API_URL || "";

function Login() {
  function loginWithGitHub(): void {
    window.location.href = `${API_URL}/api/auth/github`;
  }

  return (
    <main className="min-h-screen bg-jet-black px-6 text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center ">
        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <div className="mb-8 text-center ">
            <h1 className="text-3xl font-bold">Welcome to AI Capsule</h1>

            <p className="mt-3 text-slate-400">
              Sign in to access your private prompt library.
            </p>
          </div>

          <button
            type="button"
            onClick={loginWithGitHub}
            className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-golden-bronze px-4 py-3 font-semibold text-slate-900 transition hover:bg-golden-bronze/80"
          >
            Continue with GitHub
          </button>
        </div>
      </div>
    </main>
  );
}

export default Login;
