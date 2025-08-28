export default function ViewTask({
  tasks,
  editingId,
  form,
  onStartEdit,
  onFormChange,
  onSaveEdit,
  toggleCheck,
  deleteTask,
}) {
  return (
    <ul className="mx-auto max-w-2xl space-y-4">
      {tasks.map((task) => {
        const isEditing = editingId === task.id;
        return (
          <li
            key={task.id}
            className={
              task.completed
                ? "bg-green-300 flex items-center justify-between rounded-lg border px-4 py-3 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md"
                : "flex items-center justify-between rounded-lg border bg-white px-4 py-3 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md"
            }
          >
            <div className="flex-1">
              {isEditing ? (
                <>
                  <label htmlFor={`title-${task.id}`} className="sr-only">
                    Title
                  </label>
                  <input
                    required
                    id={`title-${task.id}`}
                    type="text"
                    value={form.title}
                    onChange={(e) => onFormChange("title", e.target.value)}
                    placeholder="Task title"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />

                  <label htmlFor={`desc-${task.id}`} className="sr-only">
                    Description
                  </label>
                  <textarea
                    required
                    id={`desc-${task.id}`}
                    rows="3"
                    value={form.description}
                    onChange={(e) =>
                      onFormChange("description", e.target.value)
                    }
                    placeholder="Task description"
                    className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </>
              ) : (
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    checked={!!task.completed}
                    onChange={() => toggleCheck(task.id)}
                  />
                  <div>
                    <h4
                      className={`text-base font-semibold ${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-slate-900"
                      }`}
                    >
                      {task.title}
                    </h4>
                    <p
                      className={`mt-1 text-sm leading-relaxed ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-slate-600"
                      }`}
                    >
                      {task.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 ml-4">
              {isEditing ? (
                <button
                  type="button"
                  onClick={onSaveEdit}
                  disabled={!form.title || !form.description}
                  className={`rounded-lg border px-4 py-1.5 text-sm font-medium shadow-sm transition
                    ${
                      !form.title || !form.description
                        ? "text-slate-400 cursor-not-allowed bg-slate-100 border-slate-200"
                        : "text-slate-700 bg-white border-slate-300 hover:bg-slate-50 hover:shadow-md active:shadow-none"
                    }`}
                >
                  Save
                </button>
              ) : (
                !task.completed && (
                  <button
                    type="button"
                    onClick={() => onStartEdit(task)}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:shadow-md active:shadow-none transition"
                  >
                    Edit
                  </button>
                )
              )}

              {!isEditing && (
                <button
                  onClick={() => deleteTask(task.id)}
                  className="rounded-md px-3 py-1 text-sm text-red-600 transition hover:bg-red-50 hover:text-red-700 active:scale-95"
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
