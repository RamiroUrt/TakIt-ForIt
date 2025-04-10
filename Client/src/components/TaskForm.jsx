import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTask, getTasks, updateTask } from "../Api";
import Logo from "../../public/img/logo.png";

export default function TaskForm() {
  const [task, setTask] = useState({ title: "", description: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getTasks().then(data => {
        const existingTask = data.find(t => t.id === parseInt(id));
        if (existingTask) setTask(existingTask);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTask(id, task);
      } else {
        await createTask(task);
      }
      navigate("/");
    } catch (error) {
      console.error("Error al enviar la tarea:", error);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="text-box-main px-4 pt-6">
        <h1 className="text-2xl font-bold">{id ? "Editar Tarea" : "Crear Tarea"}</h1>
      </div>

      <div className="flex-grow px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto">
          
          <div className="form__group field">
            <input
              type="text"
              className="form__field"
              placeholder="Título"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value,  })}
              required
            />
            <label className="form__label">Título</label>
          </div>

          <div className="form__group field">
            <textarea
              className="form__field"
              placeholder="Descripción"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              rows="3"
            />
            <label className="form__label">Descripción</label>
          </div>

          <button className="button-create" type="submit">
            {id ? "Actualizar 📋" : "Crear ✏"}
          </button>
        </form>
      </div>

      <div className="logo-contain">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
    </main>
  );
}
