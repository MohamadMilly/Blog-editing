export function UnAuthorizedPage() {
  return (
    <main className="grid min-h-full place-items-center bg-slate-950 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-pink-700">403</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          Not Authorized
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
          Only Authors can access this resource
        </p>
        <div className="mt-10 flex items-center justify-center">
          <a
            href="https://blog-consumption.vercel.app"
            className="rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-pink-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
          >
            Go back home
          </a>
        </div>
      </div>
    </main>
  );
}
