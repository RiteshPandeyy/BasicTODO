export default function TitleAndDescription({
  inputs,
  handleTaskSubmit,
  setInputs,
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {!inputs.title ? "Add a New Task" : inputs.title}
        </h2>

        <form onSubmit={handleTaskSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              required
              id="task-title"
              placeholder="Add the Title Here."
              value={inputs.title}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="text-desc"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="text-desc"
              required
              placeholder="Enter the Description of the Task..."
              value={inputs.description}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              rows="4"
            ></textarea>
          </div>

          <button
            disabled={!inputs.description || !inputs.title}
            type="submit"
            className="w-full rounded-xl px-5 py-3 text-sm font-medium text-white shadow-md transition
                     bg-slate-900 hover:bg-slate-800 hover:shadow-lg active:shadow-sm
                     disabled:bg-slate-400 disabled:hover:bg-slate-400 disabled:shadow-none"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
