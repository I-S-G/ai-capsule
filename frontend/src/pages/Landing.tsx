import { Link } from "react-router";

function Landing() {
  return (
    <main className="min-h-screen bg-jet-black text-white ">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold uppercase tracking-widest text-golden-bronze">
            AI Capsule
          </h1>

          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Your private AI prompt library.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Save, organise and manage your AI prompts, responses and
            improvements in one place.
          </p>

          <div className="mt-8">
            <Link
              to="/login"
              className="inline-flex rounded-lg bg-golden-bronze px-6 py-3 font-semibold text-jet-black transition hover:bg-golden-bronze/70"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Landing;
