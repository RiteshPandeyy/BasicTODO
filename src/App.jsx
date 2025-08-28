import { useMemo, useState } from "react";
import AddTask from "./components/AddTask";
import { Header } from "./components/Header";
import ViewTask from "./components/ViewTask";
import Modal from "./components/Modal";

function App() {
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  function handleTaskSubmit(e) {
    e.preventDefault();
    const title = inputs.title.trim();
    const description = inputs.description.trim();
    if (!title || !description) return;

    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
    setInputs({ title: "", description: "" });
    setIsModalOpen(false);
  }

  function handleStartEdit(task) {
    setEditingId(task.id);
    setEditForm({ title: task.title, description: task.description });
  }
  function handleEditChange(field, value) {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  }
  function handleSaveEdit() {
    if (!editingId) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingId
          ? {
              ...task,
              title: editForm.title.trim(),
              description: editForm.description.trim(),
            }
          : t
      )
    );
    setEditingId(null);
    setEditForm({ title: "", description: "" });
  }
  function toggleCheck(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }
  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const visibleTasks = useMemo(() => {
    let list = tasks;

    if (filter === "active") list = list.filter((task) => !task.completed);
    if (filter === "completed") list = list.filter((task) => task.completed);

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (task) =>
          task.title.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [tasks, searchQuery, filter]);

  function handleSearchSubmit() {}

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        filter={filter}
        onFilterChange={setFilter}
      />

      <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        <section>
          <AddTask
            onButtonClick={() => setIsModalOpen(true)}
            disabled={isModalOpen}
          />
        </section>

        <Modal
          handleTaskSubmit={handleTaskSubmit}
          inputs={inputs}
          setInputs={setInputs}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Your Tasks</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {visibleTasks.length} / {tasks.length}
            </span>
          </div>

          <ViewTask
            tasks={visibleTasks}
            editingId={editingId}
            form={editForm}
            onStartEdit={handleStartEdit}
            onFormChange={handleEditChange}
            onSaveEdit={handleSaveEdit}
            toggleCheck={toggleCheck}
            deleteTask={deleteTask}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
