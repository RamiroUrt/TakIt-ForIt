const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al crear la tarea");
  }
  return res.json();
}

export async function updateTask(id, task, newTitle, newDesc) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
      description: newDesc,
      completed: task.completed
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar la tarea");
  }

  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar la tarea");
  }
}

export const getTaskById = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}`);
  if (!res.ok) throw new Error("Tarea no encontrada");
  return res.json();
};
