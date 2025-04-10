import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../Api";
import { Link } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
  <main className="task-list-contain">
    <div className="task-list-box">
      <Link to="/create" className="button-create">Nueva Tarea ✏</Link>
      <ul className="w-full ">
        {tasks.map(task => ( 
          <li key={task.id} className="card-box">
            <div className="card-content ">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="card-buttons">
              <Link to={`/edit/${task.id}`} className="text-blue-600 button-edit">Editar</Link>
              <button onClick={() => handleDelete(task.id)} className="text-red-600">Eliminar</button>
              <Link to={`/task/${task.id}`}>Ver</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </main>
  );
}
