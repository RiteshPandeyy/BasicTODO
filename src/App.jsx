import { useState } from "react";
import AddTask from "./components/AddTask";
import { Header } from "./components/Header";
import ViewTask from "./components/ViewTask";
import TitleAndDescription from "./components/TitleAndDescription";
import Modal from "./components/Modal";

function App() {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  function handleTaskSubmit(e) {
    e.preventDefault();

    if (!inputs.title || !inputs.description) return;

    const newTasks = {
      id: crypto.randomUUID(),
      title: inputs.title,
      description: inputs.description,
    };

    setTasks((prev) => [...prev, newTasks]);
    setInputs({ title: "", description: "" });
    setIsModalOpen(false);
  }
  function handleStartEdit(task) {
    setEditingId(task.id);
    setEditForm({ title: task.title, description: task.description });
  }

  function handleEditChange(field, value) {
    setEditForm((p) => ({ ...p, [field]: value }));
  }

   function toggleCheck(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id){
    setTasks((task)=>task.filter((selectedtask)=>selectedtask.id!==id));
  }


  function handleSaveEdit() {
    if (!editingId) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingId
          ? { ...t, title: editForm.title, description: editForm.description }
          : t
      )
    );
    setEditingId(null);
    setEditForm({ title: "", description: "" });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      {
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
              <h2 className="text-xl font-semibold tracking-tight">
                Your Tasks
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"></span>
            </div>
           <ViewTask
            tasks={tasks}
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
      }
    </div>
  );
}

export default App;
