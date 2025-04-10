const { v4: uuidv4 } = require('uuid'); // Para generar ids únicos
const express = require('express');
const app = express();
const PORT = 3000;

const cors = require('cors'); //ayuda a las pediticones en el front


app.use(cors());
app.use(express.json()); 

// Almacenamiento temporal en memoria
let tasks = [];
let nextId = 1;

//Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

//Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

//Actualizar una tarea
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }


  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

//Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
