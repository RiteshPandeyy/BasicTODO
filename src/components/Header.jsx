export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            TODO Application
          </h2>
        </div>

        <div className="flex w-full flex-col items-stretch gap-3 md:w-auto md:flex-row md:items-center">
          <span className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm md:w-[460px]">
            <input
              placeholder="Type here to search the task..."
              className="w-full rounded-xl border border-transparent bg-transparent px-3 py-2 text-slate-800 outline-none
                         placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
            />
            <button
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-md transition
                         hover:bg-slate-800 hover:shadow-lg active:shadow-sm"
            >
              Search
            </button>
          </span>

          <div className="md:w-[200px]">
            <select
              className="w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none
                         focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
