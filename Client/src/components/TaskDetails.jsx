import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTasks } from "../Api";
import Logo from "../../public/img/logo.png";

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  


  useEffect(() => {
    getTasks().then((data) => {
      const foundTask = data.find(t => t.id === id);
      setTask(foundTask);
    });
  }, [id]);

  if (!task) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen text-white">
        <p className="text-lg">Cargando tarea...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      <div className="text-box-main px-4 pt-6">
        <h1 className="text-2xl font-bold">Detalles de la Tarea</h1>
      </div>

      <section className="flex-grow px-4 py-6 flex justify-center text-center">
        <div className="bg-white p-6 container-details">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">TITULO:</h2>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{task.title}</h2>
          <p className="text-gray-800 font-bold whitespace-pre-line">DESCRIPCION:</p>
          <p className="text-gray-700 whitespace-pre-line">{task.description || "Sin descripción."}</p>
            <p className="text-sm text-gray-500">
              Creada el: {new Date(task.createdAt).toLocaleDateString()}
            </p>
          <div className="mt-6">
            <Link to="/" className="button-create">
              Volver
            </Link>
          </div>
        </div>
      </section>

      <div className="logo-contain">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
    </main>
  );
}
